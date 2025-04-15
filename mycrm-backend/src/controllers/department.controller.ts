// src/controllers/DepartmentController.ts
import { Request, Response } from 'express';
import Department from '../models/department.model';
import Employee from '../models/employee.model';

export const getAllDepartments = async (req: Request, res: Response) => {
  const departments = await Department.findAll({ include: Employee });
  res.json(departments);
};

export const createDepartment = async (req: Request, res: Response) => {
  const { name, manager_id } = req.body;
  const newDept = await Department.create({ name, manager_id });
  res.status(201).json(newDept);
};

export const getDepartmentById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const department = await Department.findByPk(id, { include: Employee });
  if (!department) return res.status(404).json({ error: 'Department not found' });
  res.json(department);
};

export const updateDepartment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, manager_id } = req.body;
  const updated = await Department.update({ name, manager_id }, { where: { id } });
  res.json({ message: 'Updated', updated });
};

export const deleteDepartment = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Department.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
};
