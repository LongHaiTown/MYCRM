import { Router } from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeWithRole,
} from '../controllers/employee.controller';

const router = Router();

// GET /api/employees - Get all employees
router.get('/', getEmployees);

// GET /api/employees/:id - Get employee by ID
router.get('/:id', getEmployeeById);

router.get('/by-role/manager', getEmployeeWithRole);

// POST /api/employees - Create new employee
router.post('/', createEmployee);

// PUT /api/employees/:id - Update employee
router.put('/:id', updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', deleteEmployee);

export default router;