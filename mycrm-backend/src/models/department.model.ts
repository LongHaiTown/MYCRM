// src/models/DepartmentModel.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Employee from './employee.model'; // Đảm bảo tên file đúng

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Department name is required' },
      len: { args: [2, 100], msg: 'Name must be between 2 and 100 characters' },
    },
  },
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'employees',
      key: 'id',
    },
  },
}, {
  tableName: 'departments',
});

// Associations
Department.hasMany(Employee, { foreignKey: 'department_id', as: 'employees' });
Employee.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

// Only sync this specific model
Department.sync({ alter: true }).then(() => {
  console.log('Department table synced');
});

export default Department;
