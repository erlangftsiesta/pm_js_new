import {
  Controller,
  Get,
  Query,
  Inject,
  UseGuards,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { MKT_GetAllLoanApplicationUseCase } from '../../Applications/Services/MKT_GetAllLoanApplication.usecase';
import { RolesGuard } from 'src/Shared/Modules/Authentication/Infrastructure/Guards/roles.guard';
import { Roles } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/roles.decorator';
import { USERTYPE } from 'src/Shared/Enums/Users/Users.enum';
import { CurrentUser } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/user.decorator';

@Controller('mkt/int/loan-apps')
export class MKT_GetAllLoanApplicationController {
  constructor(
    @Inject(MKT_GetAllLoanApplicationUseCase)
    private readonly getAllLoanAppUseCase: MKT_GetAllLoanApplicationUseCase,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(USERTYPE.MARKETING)
  @Get()
  async getAllLoanApplications(
    @CurrentUser('id') marketingId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('searchQuery') searchQuery = '',
  ) {
    try {
      const result = await this.getAllLoanAppUseCase.execute(
        marketingId,
        page,
        pageSize,
        searchQuery,
      );

      return result; // ✅ Return langsung payload dari usecase
    } catch (err) {
      throw new HttpException(
        {
          payload: {
            error: true,
            message: err instanceof Error ? err.message : 'Unexpected error',
            reference: 'LOAN_UNKNOWN_ERROR',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
