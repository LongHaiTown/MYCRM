import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employee.routes';
import departmentRoutes from './routes/department.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);

// Middleware xử lý lỗi toàn cục
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: err.message || err,
  });
});

export default app;