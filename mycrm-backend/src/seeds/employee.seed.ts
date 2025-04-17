import Employee from '../models/employee.model';

const employeeData = [
  {
    name: 'John Doe',
    phone: '0909090909',
    email: 'john.doe@example.com',
    role: 'Manager',
    department_id: null, // sẽ update sau nếu cần
  },
  {
    name: 'Jane Smith',
    phone: '0909090909',
    email: 'jane.smith@example.com',
    role: 'Developer',
    department_id: null,
  },
  {
    name: 'Mike Johnson',
    phone: '0909090909',
    email: 'mike.johnson@example.com',
    role: 'Designer',
    department_id: null,
  },
  {
    name: 'Sarah Wilson',
    phone: '0909090909',
    email: 'sarah.wilson@example.com',
    role: 'Marketing',
    department_id: null,
  },
  {
    name: 'David Brown',
    phone: '0909090909',
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
