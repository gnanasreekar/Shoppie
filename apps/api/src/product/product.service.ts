import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(merchantId?: string) {
    return this.prisma.product.findMany({
      where: merchantId ? { merchantId } : undefined,
      include: {
        category: true,
        inventory: true,
      },
    });
  }

  async findCategories() {
    return this.prisma.category.findMany();
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug },
      include: {
        category: true,
        inventory: true,
        merchant: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return product;
  }
}
