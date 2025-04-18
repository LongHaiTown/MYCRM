import Product from '../models/product.model';
import { sequelize } from '../config/db';

type ProductStatus = 'available' | 'discontinued';

const products = [
  {
    name: 'VinFast VF e34',
    listedPrice: 690000000,
    salePrice: 660000000,
    colors: ['Trắng', 'Đen', 'Xanh'],
    status: 'available' as ProductStatus,
    description: 'Xe SUV điện cỡ C, phù hợp gia đình, trang bị ADAS.',
    images: ['vf-e34-1.jpg', 'vf-e34-2.jpg'],
    year: 2023,
    type: 'electric-SUV',
  },
  {
    name: 'VinFast VF 8',
    listedPrice: 1090000000,
    salePrice: 1050000000,
    colors: ['Trắng', 'Xanh dương', 'Đỏ'],
    status: 'available' as ProductStatus,
    description: 'SUV điện cỡ D, hiệu suất cao, trang bị công nghệ thông minh.',
    images: ['vf-8-1.jpg', 'vf-8-2.jpg'],
    year: 2024,
    type: 'electric-SUV',
  },
  {
    name: 'VinFast VF 9',
    listedPrice: 1490000000,
    salePrice: 1450000000,
    colors: ['Đen', 'Xám', 'Xanh rêu'],
    status: 'available' as ProductStatus,
    description: 'SUV điện cỡ E, 7 chỗ ngồi, pin dung lượng lớn.',
    images: ['vf-9-1.jpg', 'vf-9-2.jpg'],
    year: 2024,
    type: 'electric-SUV',
  },
  {
    name: 'VinFast Klara S',
    listedPrice: 40000000,
    salePrice: 39000000,
    colors: ['Trắng', 'Đỏ', 'Xanh Navy'],
    status: 'available' as ProductStatus,
    description: 'Xe máy điện thời trang, phù hợp học sinh, sinh viên.',
    images: ['klara-s-1.jpg'],
    year: 2022,
    type: 'bike',
  },
  {
    name: 'VinFast Feliz S',
    listedPrice: 32000000,
    salePrice: 31000000,
    colors: ['Đen', 'Xanh lá', 'Trắng'],
    status: 'available' as ProductStatus,
    description: 'Xe máy điện tiết kiệm, phù hợp di chuyển nội thành.',
    images: ['feliz-s-1.jpg'],
    year: 2023,
    type: 'bike',
  }
];

export const seedProducts = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true });

    const existingProducts = await Product.findAll();
    if (existingProducts.length > 0) {
      console.log('📦 Products already seeded');
      return;
    }

    await sequelize.transaction(async (t) => {
      await Product.bulkCreate(products, { transaction: t });
    });

    console.log('🌱 Products seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed products:', error);
    throw error;
  }
};

if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log('🌈 Seeding completed');
      process.exit(0);
    })
    .catch((err) => {
      console.error('🔥 Seeding error:', err);
      process.exit(1);
    });
}
