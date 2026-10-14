import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MerchantService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.merchant.findMany({
      include: {
        stores: true,
        settings: true,
      },
    });
  }

  async findOne(id: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id },
      include: {
        stores: true,
        settings: true,
        products: {
          take: 5,
          include: { category: true }
        }
      },
    });

    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }

    return merchant;
  }
}
