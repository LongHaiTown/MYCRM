import Department from '../models/department.model';
import Employee from '../models/employee.model';

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
  try {
    const count = await Department.count();
    if (count === 0) {
      for (const dept of departmentData) {
        const manager = await Employee.findOne({ where: { email: dept.managerEmail } }) as any;
        const department = await Department.create({
          name: dept.name,
          manager_id: manager?.id || null,
        }) as any;
        
        // Gán department_id cho manager
        if (manager && !manager.department_id) {
            await manager.update({ department_id: department.id });
        }
      }

      console.log('✅ Departments seeded');
    } else {
      console.log('ℹ️ Departments already exist, skipping');
    }
  } catch (error) {
    console.error('❌ Error seeding departments:', error);
  }
};
