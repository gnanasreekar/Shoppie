import { Controller, Get, Param } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Merchants')
@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Get()
  @ApiOperation({ summary: 'Get all merchants' })
  findAll() {
    return this.merchantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific merchant' })
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(id);
  }
}
