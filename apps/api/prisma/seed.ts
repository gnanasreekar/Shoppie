import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with dummy data...');

  // 1. Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.inventoryMovement.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.merchantSettings.deleteMany();
  await prisma.merchantEmployee.deleteMany();
  await prisma.merchant.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create standard categories
  const groceryCategory = await prisma.category.create({
    data: { name: 'Grocery', slug: 'grocery', description: 'Daily essentials' },
  });
  const electronicsCategory = await prisma.category.create({
    data: { name: 'Electronics', slug: 'electronics', description: 'Gadgets and appliances' },
  });

  // 3. Create Admin
  const passwordHash = await bcrypt.hash('password123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@shoppie.local',
      name: 'Super Admin',
      passwordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });

  // 4. Create Merchants
  const merchantUser1 = await prisma.user.create({
    data: {
      email: 'merchant@kirana.local',
      name: 'Ramesh Patel',
      passwordHash,
      role: UserRole.MERCHANT_OWNER,
    },
  });

  const merchantUser2 = await prisma.user.create({
    data: {
      email: 'merchant@electronics.local',
      name: 'Suresh Kumar',
      passwordHash,
      role: UserRole.MERCHANT_OWNER,
    },
  });

  const merchant1 = await prisma.merchant.create({
    data: {
      ownerId: merchantUser1.id,
      businessName: 'Patel Kirana Store',
      contactPhone: '9876543210',
      status: 'ACTIVE',
      settings: {
        create: {
          deliveryFee: 30,
          freeDeliveryThreshold: 500,
        },
      },
    },
  });

  const merchant2 = await prisma.merchant.create({
    data: {
      ownerId: merchantUser2.id,
      businessName: 'Kumar Electronics',
      contactPhone: '9876543211',
      status: 'ACTIVE',
      settings: {
        create: {
          deliveryFee: 50,
          freeDeliveryThreshold: 1000,
        },
      },
    },
  });

  // 5. Create Stores
  await prisma.store.create({
    data: {
      merchantId: merchant1.id,
      name: 'Patel Kirana - Varni Branch',
      slug: 'patel-kirana-varni',
      status: 'ACTIVE',
    },
  });

  await prisma.store.create({
    data: {
      merchantId: merchant2.id,
      name: 'Kumar Electronics - Nizamabad',
      slug: 'kumar-electronics-nizamabad',
      status: 'ACTIVE',
    },
  });

  // 6. Create Customers
  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@test.local',
      name: 'Priya Sharma',
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  });

  const customer = await prisma.customer.create({
    data: {
      userId: customerUser.id,
      defaultPincode: '503201',
    },
  });

  // 7. Create Products
  const product1 = await prisma.product.create({
    data: {
      merchantId: merchant1.id,
      categoryId: groceryCategory.id,
      name: 'Aashirvaad Atta 5kg',
      slug: 'aashirvaad-atta-5kg',
      basePrice: 250,
      salePrice: 240,
      status: 'ACTIVE',
      inventory: {
        create: {
          quantity: 50,
          reorderLevel: 10,
        },
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      merchantId: merchant2.id,
      categoryId: electronicsCategory.id,
      name: 'Boat Rockerz 450',
      slug: 'boat-rockerz-450',
      basePrice: 1999,
      salePrice: 1499,
      status: 'ACTIVE',
      inventory: {
        create: {
          quantity: 15,
          reorderLevel: 5,
        },
      },
    },
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
