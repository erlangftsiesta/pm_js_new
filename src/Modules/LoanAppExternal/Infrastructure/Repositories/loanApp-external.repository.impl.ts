import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanApplicationExternal } from '../../Domain/Entities/loanApp-external.entity';
import { LoanApplicationExternal_ORM_Entity } from '../Entities/loan-application-external.orm-entity';
import { ILoanApplicationExternalRepository } from '../../Domain/Repositories/loanApp-external.repository';
import { ClientExternal_ORM_Entity } from '../Entities/client-external.orm-entity';

@Injectable()
export class LoanApplicationExternalRepositoryImpl
  implements ILoanApplicationExternalRepository
{
  constructor(
    @InjectRepository(LoanApplicationExternal_ORM_Entity)
    private readonly ormRepository: Repository<LoanApplicationExternal_ORM_Entity>,
  ) {}

  private toDomain(orm: LoanApplicationExternal_ORM_Entity): LoanApplicationExternal {
    return new LoanApplicationExternal(
      { id: orm.nasabah.id },
      orm.jenis_pembiayaan,
      Number(orm.nominal_pinjaman),
      orm.tenor,
      orm.berkas_jaminan,
      orm.status_pinjaman,
      orm.id,
      orm.pinjaman_ke,
      orm.pinjaman_terakhir ? Number(orm.pinjaman_terakhir) : undefined,
      orm.sisa_pinjaman ? Number(orm.sisa_pinjaman) : undefined,
      orm.realisasi_pinjaman,
      orm.cicilan_perbulan ? Number(orm.cicilan_perbulan) : undefined,
      orm.status_pengajuan,
      orm.validasi_pengajuan,
      orm.catatan,
      orm.catatan_spv,
      orm.catatan_marketing,
      orm.is_banding,
      orm.alasan_banding,
      orm.created_at,
      orm.updated_at,
      orm.deleted_at,
    );
  }

  private toOrm(domain: LoanApplicationExternal): Partial<LoanApplicationExternal_ORM_Entity> {
    return {
      id: domain.id,
      nasabah: { id: domain.nasabah.id } as ClientExternal_ORM_Entity,
      jenis_pembiayaan: domain.jenis_pembiayaan,
      nominal_pinjaman: domain.nominal_pinjaman,
      tenor: domain.tenor,
      berkas_jaminan: domain.berkas_jaminan,
      status_pinjaman: domain.status_pinjaman,
      pinjaman_ke: domain.pinjaman_ke,
      pinjaman_terakhir: domain.pinjaman_terakhir,
      sisa_pinjaman: domain.sisa_pinjaman,
      realisasi_pinjaman: domain.realisasi_pinjaman,
      cicilan_perbulan: domain.cicilan_perbulan,
      status_pengajuan: domain.status_pengajuan,
      validasi_pengajuan: domain.validasi_pengajuan,
      catatan: domain.catatan,
      catatan_spv: domain.catatan_spv,
      catatan_marketing: domain.catatan_marketing,
      is_banding: domain.is_banding,
      alasan_banding: domain.alasan_banding,
      created_at: domain.created_at,
      updated_at: domain.updated_at,
      deleted_at: domain.deleted_at,
    };
  }

  private toOrmPartial(partial: Partial<LoanApplicationExternal>): Partial<LoanApplicationExternal_ORM_Entity> {
    const orm: Partial<LoanApplicationExternal_ORM_Entity> = {};

    if (partial.nasabah?.id)
      orm.nasabah = { id: partial.nasabah.id } as ClientExternal_ORM_Entity;
    if (partial.jenis_pembiayaan)
      orm.jenis_pembiayaan = partial.jenis_pembiayaan;
    if (partial.nominal_pinjaman !== undefined)
      orm.nominal_pinjaman = partial.nominal_pinjaman;
    if (partial.tenor !== undefined)
      orm.tenor = partial.tenor;
    if (partial.berkas_jaminan)
      orm.berkas_jaminan = partial.berkas_jaminan;
    if (partial.status_pinjaman)
      orm.status_pinjaman = partial.status_pinjaman;
    if (partial.pinjaman_ke !== undefined)
      orm.pinjaman_ke = partial.pinjaman_ke;
    if (partial.pinjaman_terakhir !== undefined)
      orm.pinjaman_terakhir = partial.pinjaman_terakhir;
    if (partial.sisa_pinjaman !== undefined)
      orm.sisa_pinjaman = partial.sisa_pinjaman;
    if (partial.realisasi_pinjaman)
      orm.realisasi_pinjaman = partial.realisasi_pinjaman;
    if (partial.cicilan_perbulan !== undefined)
      orm.cicilan_perbulan = partial.cicilan_perbulan;
    if (partial.status_pengajuan)
      orm.status_pengajuan = partial.status_pengajuan;
    if (partial.validasi_pengajuan !== undefined)
      orm.validasi_pengajuan = partial.validasi_pengajuan;
    if (partial.catatan)
      orm.catatan = partial.catatan;
    if (partial.catatan_spv)
      orm.catatan_spv = partial.catatan_spv;
    if (partial.catatan_marketing)
      orm.catatan_marketing = partial.catatan_marketing;
    if (partial.is_banding !== undefined)
      orm.is_banding = partial.is_banding;
    if (partial.alasan_banding)
      orm.alasan_banding = partial.alasan_banding;
    if (partial.created_at)
      orm.created_at = partial.created_at;
    if (partial.updated_at)
      orm.updated_at = partial.updated_at;
    if (partial.deleted_at)
      orm.deleted_at = partial.deleted_at;

    return orm;
  }

  async findById(id: number): Promise<LoanApplicationExternal | null> {
    const orm = await this.ormRepository.findOne({
      where: { id },
      relations: ['nasabah'],
    });
    return orm ? this.toDomain(orm) : null;
  }

  async findByNasabahId(nasabahId: number): Promise<LoanApplicationExternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { nasabah: { id: nasabahId } },
      relations: ['nasabah'],
    });
    return ormEntities.map((e) => this.toDomain(e));
  }

  async findAll(): Promise<LoanApplicationExternal[]> {
    const ormEntities = await this.ormRepository.find({ relations: ['nasabah'] });
    return ormEntities.map((e) => this.toDomain(e));
  }

  async save(data: LoanApplicationExternal): Promise<LoanApplicationExternal> {
    const saved = await this.ormRepository.save(this.toOrm(data));
    return this.toDomain(saved as LoanApplicationExternal_ORM_Entity);
  }

  async update(id: number, data: Partial<LoanApplicationExternal>): Promise<LoanApplicationExternal> {
    await this.ormRepository.update(id, this.toOrmPartial(data));
    const updated = await this.ormRepository.findOne({
      where: { id },
      relations: ['nasabah'],
    });
    if (!updated) throw new Error('LoanApplicationExternal not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
