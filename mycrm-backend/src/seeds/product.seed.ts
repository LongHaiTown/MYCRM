import Product from '../models/product.model';
import { sequelize } from '../config/db';

type ProductStatus = 'available' | 'discontinued';

const products = [
  {
    name: 'iPhone 15 Pro',
    listedPrice: 999.99,
    salePrice: 899.99,
    colors: ['Space Gray', 'Silver', 'Gold'],
    status: 'available' as ProductStatus,
    description: 'The latest iPhone with advanced camera system and A17 Pro chip',
    images: ['iphone15pro-1.jpg', 'iphone15pro-2.jpg']
  },
  {
    name: 'MacBook Pro 14"',
    listedPrice: 1999.99,
    salePrice: 1899.99,
    colors: ['Space Gray', 'Silver'],
    status: 'available' as ProductStatus,
    description: 'Powerful laptop with M2 Pro chip and Liquid Retina XDR display',
    images: ['macbookpro-1.jpg', 'macbookpro-2.jpg']
  },
  {
    name: 'AirPods Pro',
    listedPrice: 249.99,
    salePrice: 229.99,
    colors: ['White'],
    status: 'available' as ProductStatus,
    description: 'Active Noise Cancellation and Spatial Audio for immersive sound',
    images: ['airpodspro-1.jpg']
  },
  {
    name: 'iPad Pro 12.9"',
    listedPrice: 1099.99,
    salePrice: 999.99,
    colors: ['Space Gray', 'Silver'],
    status: 'available' as ProductStatus,
    description: 'Supercharged by M2 chip with stunning Liquid Retina XDR display',
    images: ['ipadpro-1.jpg', 'ipadpro-2.jpg']
  },
  {
    name: 'Apple Watch Series 9',
    listedPrice: 399.99,
    salePrice: 379.99,
    colors: ['Midnight', 'Starlight', 'Silver'],
    status: 'available' as ProductStatus,
    description: 'Advanced health features and always-on Retina display',
    images: ['applewatch-1.jpg']
  }
];

export const seedProducts = async () => {
  try {
    // Verify database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Sync the model with safe options
    await sequelize.sync({ alter: true }); // Use alter instead of force to preserve data
    
    // Check if products already exist
    const existingProducts = await Product.findAll();
    if (existingProducts.length > 0) {
      console.log('Products already exist in the database');
      return;
    }

    // Create products with transaction for data consistency
    await sequelize.transaction(async (t) => {
      await Product.bulkCreate(products, { transaction: t });
    });

    console.log('Products seeded successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error seeding products:', error.message);
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    } else {
      console.error('Unknown error occurred while seeding products');
    }
    throw error; // Re-throw to handle it in the calling code
  } finally {
    // Don't close the connection here as it might be used elsewhere
    // The connection will be managed by the application
  }
};

// Only run if this file is executed directly
if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log('Seed process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed process failed:', error);
      process.exit(1);
    });
} 