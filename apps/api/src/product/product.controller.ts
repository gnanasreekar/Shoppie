import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'merchantId', required: false })
  findAll(@Query('merchantId') merchantId?: string) {
    return this.productService.findAll(merchantId);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  findCategories() {
    return this.productService.findCategories();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a specific product by slug' })
  findOne(@Param('slug') slug: string) {
    return this.productService.findOne(slug);
  }
}
