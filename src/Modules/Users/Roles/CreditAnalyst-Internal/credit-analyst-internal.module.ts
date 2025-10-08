// src/use-case/Marketing-Internal/marketing-internal.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import entitas
import { ApprovalInternalModule } from 'src/Modules/LoanAppInternal/Modules/approval-internal.module';
import { LoanApplicationInternalModule } from 'src/Modules/LoanAppInternal/Modules/loanApp-internal.module';
import { UsersModule } from '../../ModuleUsers.module';

import { ApprovalInternal_ORM_Entity } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/approval-internal.orm-entity';
import { Users_ORM_Entity } from '../../Infrastructure/Entities/users.orm-entity';
import { LoanApplicationInternal_ORM_Entity } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/loan-application-internal.orm-entity';

//? USE CASE
import { CA_ApproveOrRejectUseCase } from './Applications/Services/CA_ApprovedOrReject.usecase';
//? CONTROLLER
import { CA_ApprovedOrRejectController } from './Infrastructure/Controllers/CA_ApprovedOrReject.controller';
import { CA_GetAllApprovalHistory_Controller } from './Infrastructure/Controllers/CA_GetAllApprovalHistory.controller';
import { CA_GetAllApprovalRequest_UseCase } from './Applications/Services/CA_GetAllApprovalRequest.usecase';
import { CA_GetAllApprovalHistory_UseCase } from './Applications/Services/CA_GetAllApprovalHistory.usecase';
import { CA_GetAllApprovalRequest_Controller } from './Infrastructure/Controllers/CA_GetAlllAppprovalRequest.controller';
import { CA_GetLoanApplicationByIdController } from './Infrastructure/Controllers/CA_GetLoanApplicatonById.controller';
import { CA_GetLoanApplicationByIdUseCase } from './Applications/Services/CA_GetLoanApplicationById.usecase';
@Module({
  imports: [
    ApprovalInternalModule,
    LoanApplicationInternalModule,
    UsersModule,
    TypeOrmModule.forFeature([
      ApprovalInternal_ORM_Entity,
      Users_ORM_Entity,
      LoanApplicationInternal_ORM_Entity,
    ]),
  ],
  controllers: [
    CA_ApprovedOrRejectController,
    CA_GetAllApprovalHistory_Controller,
    CA_GetAllApprovalRequest_Controller,
    CA_GetLoanApplicationByIdController,
  ],
  providers: [
    CA_ApproveOrRejectUseCase,
    CA_GetAllApprovalRequest_UseCase,
    CA_GetAllApprovalHistory_UseCase,
    CA_GetLoanApplicationByIdUseCase,
  ],
})
export class CreditAnalystInternalUseCaseModule {}
