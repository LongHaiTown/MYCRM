import { seedEmployees } from './employee.seed';
import { seedDepartments } from './department.seed';

export const runSeeds = async () => {
  try {
    console.log('Starting database seeding...');
    
  // Gọi seed theo thứ tự hợp lý
  await seedEmployees();     // Tạo trước để có manager
  await seedDepartments();   // Gán manager_id từ employee đã có
    
    console.log('All seeding completed successfully');
  } catch (error) {
    console.error('Error running seeds:', error);
  }
}; 