import app from './app';
import dotenv from 'dotenv';
import { sequelize } from './config/db'; // thêm dòng này

import './models/department.model';
import './models/employee.model';
import './models/product.model';

import { runAllSeeds } from './seeds';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Tạo bảng nếu chưa có (và cập nhật nếu thay đổi model)
    await sequelize.sync({ force: true }); // Tạo lại toàn bộ bảng
    console.log('✅ Database synchronized');

    // Seed dữ liệu mẫu
    await runAllSeeds();

    // Khởi chạy server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

startServer();
