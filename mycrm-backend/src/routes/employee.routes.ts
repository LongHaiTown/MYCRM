import { Router } from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller';

const EmployeeController = require("../controllers/employee.controller");

const router = Router();

// GET /api/employees - Lấy danh sách nhân viên
router.get('/', EmployeeController.getEmployees);

// GET /api/employees/:id - Lấy nhân viên theo ID
// router.get('/:id', EmployeeController.);

// // POST /api/employees - Tạo nhân viên mới
// router.post('/', createEmployee);

// // PUT /api/employees/:id - Cập nhật nhân viên
// router.put('/:id', updateEmployee);

// // DELETE /api/employees/:id - Xóa nhân viên
// router.delete('/:id', deleteEmployee);

export default router;