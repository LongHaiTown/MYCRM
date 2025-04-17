// src/models/employee.model.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name is required' },
      len: { args: [2, 50], msg: 'Name must be between 2 and 50 characters' },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: { args: [9, 15], msg: 'Phone must be between 9 and 15 characters' },
      is: {
        args: /^[0-9+\-\s]+$/i,
        msg: 'Invalid phone number format',
      },
    },
  },  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Invalid email format' },
      notEmpty: { msg: 'Email is required' },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Role is required' },
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'departments',
      key: 'id',
    },
  }
}, {
  tableName: 'employees',
});

export default Employee;
