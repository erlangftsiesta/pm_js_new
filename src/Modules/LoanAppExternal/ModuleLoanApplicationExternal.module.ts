// Presentation/ModuleLoanApplicationInternal.module.ts
import { Module } from '@nestjs/common';
import { AddressExternalModule } from './Modules/address-external.module';
import { ApprovalExternalModule } from './Modules/approval-external.module';
import { ClientExternalModule } from './Modules/client-external.module';
import { CollateralByBPJS_External_Module } from './Modules/collateral-bpjs-external.module';
import { CollateralByBPKB_External_Module } from './Modules/collateral-bpkb-external.module';
import { CollateralBySHM_External_Module } from './Modules/collateral-shm-external.module';
import { CollateralByKedinasan_External_Module } from './Modules/collateral-kedinasan-external.module';
import { EmergencyContact_External_Module } from './Modules/emergency-contact-internal.module';
import { FinancialDependents_External_Module } from './Modules/financial-dependents-external.module';
import { Jobs_External_Module } from './Modules/job-external.module';
import { LoanGuarantor_External_Module } from './Modules/loan-guarantor-external.module';
import { LoanApplication_External_Module } from './Modules/loanApp-external.module';
import { OtherExistLoans_External_Module } from './Modules/other-exist-loans-external.module';
import { SurveyPhotos_External_Module } from './Modules/survey-photos-external.module';
import { SurveyReports_External_Module } from './Modules/survey-reports-external.module';
import { AddressExternalController } from './Presentation/Controllers/address-external.controller';

@Module({
  imports: [
    AddressExternalModule,
    ApprovalExternalModule,
    ClientExternalModule,
    CollateralByBPJS_External_Module,
    CollateralByBPKB_External_Module,
    CollateralBySHM_External_Module,
    CollateralByKedinasan_External_Module,
    EmergencyContact_External_Module,
    FinancialDependents_External_Module,
    Jobs_External_Module,
    LoanGuarantor_External_Module,
    LoanApplication_External_Module,
    OtherExistLoans_External_Module,
    SurveyPhotos_External_Module,
    SurveyReports_External_Module,
    // kalau nanti ada module lain (RepeatOrderInternalModule, LoanInternalModule, dll) tinggal ditambahin sini
  ],
  controllers: [
    AddressExternalController
  ],
  exports: [
    AddressExternalModule,
    ApprovalExternalModule,
    ClientExternalModule,
    CollateralByBPJS_External_Module,
    CollateralByBPKB_External_Module,
    CollateralBySHM_External_Module,
    CollateralByKedinasan_External_Module,
    EmergencyContact_External_Module,
    FinancialDependents_External_Module,
    Jobs_External_Module,
    LoanGuarantor_External_Module,
    LoanApplication_External_Module,
    OtherExistLoans_External_Module,
    SurveyPhotos_External_Module,
    SurveyReports_External_Module,
  ],
})
export class ModuleLoanApplicationExternal {}
