import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import {
  IClientInternalRepository,
  CLIENT_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/client-internal.repository';
import {
  IAddressInternalRepository,
  ADDRESS_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/address-internal.repository';
import {
  IFamilyInternalRepository,
  FAMILY_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/family-internal.repository';
import {
  IJobInternalRepository,
  JOB_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/job-internal.repository';
import {
  ILoanApplicationInternalRepository,
  LOAN_APPLICATION_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/loanApp-internal.repository';
import {
  ICollateralInternalRepository,
  COLLATERAL_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/collateral-internal.repository';
import {
  IRelativesInternalRepository,
  RELATIVE_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/relatives-internal.repository';
import {
  IFileStorageService,
  FILE_STORAGE_SERVICE,
} from 'src/Shared/Modules/Storage/Domain/Services/IFileStorage.service';
import {
  IUnitOfWork,
  UNIT_OF_WORK,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/IUnitOfWork.repository';

@Injectable()
export class MKT_UpdateLoanApplicationUseCase {
  constructor(
    @Inject(CLIENT_INTERNAL_REPOSITORY)
    private readonly clientRepo: IClientInternalRepository,
    @Inject(ADDRESS_INTERNAL_REPOSITORY)
    private readonly addressRepo: IAddressInternalRepository,
    @Inject(FAMILY_INTERNAL_REPOSITORY)
    private readonly familyRepo: IFamilyInternalRepository,
    @Inject(JOB_INTERNAL_REPOSITORY)
    private readonly jobRepo: IJobInternalRepository,
    @Inject(LOAN_APPLICATION_INTERNAL_REPOSITORY)
    private readonly loanAppRepo: ILoanApplicationInternalRepository,
    @Inject(COLLATERAL_INTERNAL_REPOSITORY)
    private readonly collateralRepo: ICollateralInternalRepository,
    @Inject(RELATIVE_INTERNAL_REPOSITORY)
    private readonly relativeRepo: IRelativesInternalRepository,
    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorage: IFileStorageService,
    @Inject(UNIT_OF_WORK)
    private readonly uow: IUnitOfWork,
  ) {}

  async execute(payload: any, files: any, clientId: number) {
    const now = new Date();

    try {
      return await this.uow.start(async () => {
        // Ambil semua sub-payload
        const clientInternal = payload?.client_internal;
        const addressInternal = payload?.address_internal;
        const familyInternal = payload?.family_internal;
        const jobInternal = payload?.job_internal;
        const loanAppInternal = payload?.loan_application_internal;
        const collateralInternal = payload?.collateral_internal;
        const relativeInternal = payload?.relative_internal;

        // 1. Ambil Client
        const client = await this.clientRepo.findById(clientId);
        if (!client) throw new BadRequestException('Client tidak ditemukan');

        // 2. Upload files
        const filePaths = files
          ? await this.fileStorage.saveFiles(client.id!, client.nama_lengkap, files)
          : {};

        // Logging jika payload kosong
        if (
          !clientInternal &&
          !addressInternal &&
          !familyInternal &&
          !jobInternal &&
          !loanAppInternal &&
          !collateralInternal &&
          !relativeInternal &&
          Object.keys(filePaths).length === 0
        ) {
          console.log('Warning: Tidak ada data yang dikirim. DB tidak berubah.');
        }

        // 3. Update Client
        if (clientInternal || Object.keys(filePaths).length > 0) {
          Object.assign(client, {
            ...clientInternal,
            foto_ktp: filePaths['foto_ktp']?.[0] ?? client.foto_ktp,
            foto_kk: filePaths['foto_kk']?.[0] ?? client.foto_kk,
            foto_id_card: filePaths['foto_id_card']?.[0] ?? client.foto_id_card,
            foto_rekening: filePaths['foto_rekening']?.[0] ?? client.foto_rekening,
            updated_at: now,
          });
          await this.clientRepo.save(client);
        } else {
          console.log('Client update skipped (no valid data or files).');
        }

        // 4. Update Address
        if (addressInternal) {
          await this.addressRepo.update(client.id!, { ...addressInternal, updated_at: now });
        }

        // 5. Update Family
        if (familyInternal) {
          await this.familyRepo.update(client.id!, { ...familyInternal, updated_at: now });
        }

        // 6. Update Job
        if (jobInternal) {
          await this.jobRepo.update(client.id!, { ...jobInternal, updated_at: now });
        }

        // 7. Update Loan Application
        if (loanAppInternal) {
          const loanApps = await this.loanAppRepo.findByNasabahId(client.id!);
          const loanApp = loanApps?.[0];
          if (loanApp) {
            await this.loanAppRepo.update(loanApp.id!, { ...loanAppInternal, updated_at: now });
          }
        }

        // 8. Update Collateral
        if (collateralInternal) {
          await this.collateralRepo.update(client.id!, { ...collateralInternal, updated_at: now });
        }

        // 9. Update Relative
        if (relativeInternal) {
          await this.relativeRepo.update(client.id!, { ...relativeInternal, updated_at: now });
        }

        return {
          payload: {
            error: false,
            message: 'Pengajuan berhasil diupdate',
            reference: 'LOAN_UPDATE_OK',
            data: { filePaths },
          },
        };
      });
    } catch (err: any) {
      console.log('Error in UpdateLoanAppUseCase:', err);
      throw new BadRequestException(err.message || 'Gagal update pengajuan');
    }
  }
}
