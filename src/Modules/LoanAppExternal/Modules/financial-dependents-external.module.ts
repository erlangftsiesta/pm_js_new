// Modules/address-internal.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialDependentsExternal_ORM_Entity } from '../Infrastructure/Entities/financial-dependents.orm-entity';
import { FinancialDependentsExternalRepositoryImpl } from '../Infrastructure/Repositories/financial-dependents-external.repository.impl';
import { FINANCIAL_DEPENDENTS_EXTERNAL_REPOSITORY } from '../Domain/Repositories/financial-dependents-external.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialDependentsExternal_ORM_Entity])],
  providers: [
    {
      provide: FINANCIAL_DEPENDENTS_EXTERNAL_REPOSITORY,
      useClass: FinancialDependentsExternalRepositoryImpl,
    },
    // GetAddressByNasabahIdUseCase,
  ],
  exports: [
    FINANCIAL_DEPENDENTS_EXTERNAL_REPOSITORY,
    // GetAddressByNasabahIdUseCase,
  ],
})
export class FinancialDependents_External_Module {}
