// Modules/address-internal.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollateralByBPJS_ORM_Entity } from '../Infrastructure/Entities/collateral-bpjs.orm-entity';
import { CollateralByBPJSRepositoryImpl } from '../Infrastructure/Repositories/collateral-bpjs-external.repository.impl';
import { COLLATERAL_BPJS_EXTERNAL_REPOSITORY } from '../Domain/Repositories/collateral-bpjs-external.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CollateralByBPJS_ORM_Entity])],
  providers: [
    {
      provide: COLLATERAL_BPJS_EXTERNAL_REPOSITORY,
      useClass: CollateralByBPJSRepositoryImpl,
    },
    // GetAddressByNasabahIdUseCase,
  ],
  exports: [
    COLLATERAL_BPJS_EXTERNAL_REPOSITORY,
    // GetAddressByNasabahIdUseCase,
  ],
})
export class CollateralByBPJS_External_Module {}
