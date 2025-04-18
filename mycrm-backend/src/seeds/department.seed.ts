import Department from '../models/department.model';
import { sequelize } from '../config/db';

const departmentData = [
  {
    name: 'Sales',
  },
  {
    name: 'Marketing',
  },
  {
    name: 'Development',
  },
];

export const seedDepartments = async () => {
  const transaction = await sequelize.transaction();
  
  try {
    // Check if departments already exist
    const count = await Department.count({ transaction });
    if (count > 0) {
      console.log('ℹ️ Departments already exist, skipping');
      await transaction.commit();
      return;
    }

    // Create departments
    await Promise.all(
      departmentData.map(dept => 
        Department.create({
          name: dept.name,
          manager_id: null
        }, { transaction })
      )
    );

    await transaction.commit();
    console.log('✅ Departments seeded successfully');
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Error seeding departments:', error);
    throw error;
  }
};
