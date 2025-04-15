import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    timezone: '+07:00', // Set your timezone here
    define: {
      timestamps: true,
      underscored: true, // Use snake_case for timestamps
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Unable to connect to the database:', err));

export default sequelize;