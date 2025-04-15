import Employee from '../models/employee.model';

const employeeData = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Manager',
    department_id: null, // sẽ update sau nếu cần
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Developer',
    department_id: null,
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Designer',
    department_id: null,
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Marketing',
    department_id: null,
  },
  {
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Sales',
    department_id: null,
  },
];

export const seedEmployees = async () => {
  try {
    const count = await Employee.count();
    if (count === 0) {
      await Employee.bulkCreate(employeeData);
      console.log('✅ Employees seeded');
    } else {
      console.log('ℹ️ Employees already exist, skipping');
    }
  } catch (error) {
    console.error('❌ Error seeding employees:', error);
  }
};
