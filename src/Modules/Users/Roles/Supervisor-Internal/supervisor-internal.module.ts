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
import { SPV_ApproveOrRejectUseCase } from './Applications/Services/SPV_ApprovedOrReject.usecase';
import { SPV_GetAllApproval_ByTeam_UseCase } from './Applications/Services/SPV_GetApprovalHistoryByTeam.usecase';
import { SPV_GetAllApprovalRequestByTeam_UseCase } from './Applications/Services/SPV_GetAllApprovalRequestByTeam.usecase';

//? CONTROLLER
import { SPV_ApprovedOrRejectController } from './Presentation/Controllers/SPV_CreateApprovedOrReject.controller';
import { SPV_GetAllApprovalHistory_Controller } from './Presentation/Controllers/SPV_GetApprovalHistoryByTeam.controller';
import { SPV_GetAllApprovalRequest_ByTeam_Controller } from './Presentation/Controllers/SPV_GetAllApprovalRequestByTeam.controller';
import { SPV_GetLoanApplicationByIdController } from './Presentation/Controllers/SPV_GetLoanApplicationById.controller';
import { SPV_GetLoanApplicationByIdUseCase } from './Applications/Services/SPV_GetLoanApplicationById.usecase';
import { SPV_GetTeamsController } from './Presentation/Controllers/SPV_GetTeams.controller';
import { SPV_GetTeamsUseCase } from './Applications/Services/SPV_GetTeams.usecase';
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
    SPV_ApprovedOrRejectController,
    SPV_GetAllApprovalHistory_Controller,
    SPV_GetAllApprovalRequest_ByTeam_Controller,
    SPV_GetLoanApplicationByIdController,
    SPV_GetTeamsController
  ],
  providers: [
    SPV_ApproveOrRejectUseCase,
    SPV_GetAllApproval_ByTeam_UseCase,
    SPV_GetAllApprovalRequestByTeam_UseCase,
    SPV_GetLoanApplicationByIdUseCase,
    SPV_GetTeamsUseCase
  ],
})
export class SupervisorInternalUseCaseModule {}
