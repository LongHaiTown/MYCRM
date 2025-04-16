import { sequelize } from '../config/db';

import { seedEmployees } from './employee.seed';
import { seedDepartments } from './department.seed';
import { seedProducts } from './product.seed';


export const runAllSeeds = async () => {
  const transaction = await sequelize.transaction();
  
  try {
    console.log('🚀 Starting database seeding...');

    // First, sync all models to ensure tables exist
    console.log('\n🔄 Syncing database models...');
    await sequelize.sync({ force: true }); // Use force: true to recreate tables
    console.log('✅ Database models synced successfully');

    // 1. Seed Employees first
    console.log('\n📝 Seeding employees...');
    await seedEmployees();
    console.log('✅ Employee seeding completed');

    // 2. Seed Departments (depends on employees)
    console.log('\n📝 Seeding departments...');
    await seedDepartments();
    console.log('✅ Department seeding completed');

    // 3. Seed Products (independent)
    console.log('\n📝 Seeding products...');
    await seedProducts();
    console.log('✅ Product seeding completed');

    await transaction.commit();
    console.log('\n✨ All seeds completed successfully!');
  } catch (error) {
    await transaction.rollback();
    console.error('\n❌ Error during seeding:', error);
    throw error;
  }
};

// Only run if this file is executed directly
if (require.main === module) {
  runAllSeeds()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding process failed:', error);
      process.exit(1);
    });
} 