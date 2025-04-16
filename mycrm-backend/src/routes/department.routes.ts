// src/routes/departmentRoutes.ts
import { Router } from 'express';
import {
  getAllDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller';

const router = Router();

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.post('/', createDepartment);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

export default router;
