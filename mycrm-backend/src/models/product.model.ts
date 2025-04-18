import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Product name is required' },
      len: { args: [2, 100], msg: 'Name must be between 2 and 100 characters' },
    },
  },
  listedPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Listed price must be a number' },
      min: { args: [0], msg: 'Listed price cannot be negative' },
    },
  },
  salePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Sale price must be a number' },
      min: { args: [0], msg: 'Sale price cannot be negative' },
    },
  },
  colors: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'At least one color is required' },
    },
  },
  status: {
    type: DataTypes.ENUM('available', 'discontinued'),
    allowNull: false,
    defaultValue: 'available',
    validate: {
      isIn: {
        args: [['available', 'discontinued']],
        msg: 'Status must be either available or discontinued',
      },
    },
  },

  // 🔥 Thêm trường `year`
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Year must be an integer' },
      min: { args: [2000], msg: 'Year must be after 2000' }, // tùy bạn
    },
  },

  // 🔥 Thêm trường `type`
  type: {
    type: DataTypes.ENUM('electric-sedan', 'electric-SUV', 'bike', 'truck'),
    defaultValue: 'electric-sedan',
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Type is required' },
    },
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: 'products',
  timestamps: true,
  underscored: true,
});

export default Product;
