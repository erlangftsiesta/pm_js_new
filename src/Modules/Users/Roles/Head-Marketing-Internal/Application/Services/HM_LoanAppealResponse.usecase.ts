import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApprovalInternal } from 'src/Modules/LoanAppInternal/Domain/Entities/approval-internal.entity';
import {
  APPROVAL_INTERNAL_REPOSITORY,
  IApprovalInternalRepository,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/approval-internal.repository';
import {
  ILoanApplicationInternalRepository,
  LOAN_APPLICATION_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/loanApp-internal.repository';
import { ApprovalInternalStatusEnum } from 'src/Shared/Enums/Internal/Approval.enum';
import { StatusPengajuanEnum } from 'src/Shared/Enums/Internal/LoanApp.enum';
import { USERTYPE } from 'src/Shared/Enums/Users/Users.enum';

export class HM_LoanAppealResponseUseCase {
  constructor(
    @Inject(APPROVAL_INTERNAL_REPOSITORY)
    private readonly approvalInternalRepo: IApprovalInternalRepository,
    @Inject(LOAN_APPLICATION_INTERNAL_REPOSITORY)
    private readonly loanApplicationInternalRepo: ILoanApplicationInternalRepository,
  ) {}

  async execute(
    headMarketingId: number,
    loan_id: number,
    appeal_response:
      | ApprovalInternalStatusEnum.APPROVED
      | ApprovalInternalStatusEnum.REJECTED,
    appeal_consideration?: string, //! di database tetep nilainya keterangan, tapi di FE ini pertimbangan
    appeal_conclusion?: string,
  ) {
    try {
      const now = new Date();
      const approval = new ApprovalInternal(
        loan_id,
        { id: headMarketingId },
        USERTYPE.HM,
        appeal_response,
        true,
        undefined,
        appeal_consideration,
        appeal_conclusion,
        now,
        now,
      );
      const result = await this.approvalInternalRepo.save(approval);

      if (!result) {
        throw new HttpException(
          {
            error: true,
            message: 'Head Marketing Appeal response processing failed',
            reference: 'HM_APPEAL_RESPONSE_FAILED',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const triggerLoanApplicationInternalStatus =
        await this.loanApplicationInternalRepo.findById(loan_id);
      if (!triggerLoanApplicationInternalStatus) {
        throw new HttpException(
          {
            error: true,
            message: 'Head Marketing Appeal response processing failed',
            reference: 'HM_APPEAL_RESPONSE_FAILED',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.loanApplicationInternalRepo.update(loan_id, {
        status:
          appeal_response === ApprovalInternalStatusEnum.APPROVED
            ? StatusPengajuanEnum.APPROVED_BANDING_HM
            : StatusPengajuanEnum.REJECTED_BANDING_HM,
      });

      return {
        payload: {
          success: true,
          message: `Loan appeal response created successfully.`,
          reference: 'HM_APPEAL_RESPONSE_SUCCESS',
        },
      };
    } catch (error) {
      console.error(
        `Error in HM_LoanAppealResponseUseCase.execute: ${error.message}`,
      );
      throw error;
    }
  }
}
