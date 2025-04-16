// src/controllers/DepartmentController.ts
import { Request, Response } from 'express';
import Department from '../models/department.model';
import Employee from '../models/employee.model';

export const getAllDepartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const departments = await Department.findAll({ 
      include: [{ model: Employee, as: 'employees' }]
    });
    // const departments = await Department.findAll();

    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching departments' });
  }
};

export const createDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: 'Error creating department' });
  }
};

export const getDepartmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const department = await Department.findByPk(req.params.id, { 
      include: [{ model: Employee, as: 'employees' }]
    });
    if (!department) {
      res.status(404).json({ error: 'Department not found' });
      return;
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching department' });
  }
};

export const updateDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      res.status(404).json({ error: 'Department not found' });
      return;
    }
    await department.update(req.body);
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: 'Error updating department' });
  }
};

export const deleteDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      res.status(404).json({ error: 'Department not found' });
      return;
    }
    await department.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting department' });
  }
};
