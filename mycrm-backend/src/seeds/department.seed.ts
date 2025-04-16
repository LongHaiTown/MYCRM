import Department from '../models/department.model';
import Employee from '../models/employee.model';
import { sequelize } from '../config/db';
import { Model } from 'sequelize';

interface DepartmentInstance extends Model {
  id: number;
  name: string;
  manager_id: number | null;
}

interface EmployeeInstance extends Model {
  id: number;
  email: string;
  department_id: number | null;
  role: string;
}

const departmentData = [
  {
    name: 'Sales',
    managerEmail: 'david.brown@example.com',
  },
  {
    name: 'Marketing',
    managerEmail: 'sarah.wilson@example.com',
  },
  {
    name: 'Development',
    managerEmail: 'jane.smith@example.com',
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

    // Create departments first
    const departments = await Promise.all(
      departmentData.map(dept => 
        Department.create({
          name: dept.name,
          manager_id: null // Initialize as null
        }, { transaction })
      )
    ) as DepartmentInstance[];

    // Update managers after departments are created
    for (const [index, dept] of departments.entries()) {
      const managerEmail = departmentData[index].managerEmail;
      const manager = await Employee.findOne({ 
        where: { email: managerEmail },
        transaction 
      }) as EmployeeInstance | null;

      if (manager) {
        // Update department's manager
        await dept.update({ manager_id: manager.id }, { transaction });
        
        // Update employee's department
        await manager.update({ 
          department_id: dept.id,
          role: 'Manager' // Ensure manager role
        }, { transaction });
      } else {
        console.warn(`⚠️ Manager with email ${managerEmail} not found for department ${dept.name}`);
      }
    }

    await transaction.commit();
    console.log('✅ Departments seeded successfully');
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Error seeding departments:', error);
    throw error;
  }
};
