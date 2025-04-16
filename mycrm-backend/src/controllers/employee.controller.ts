import { Request, Response } from 'express';
import Employee from '../models/employee.model';

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee' });
  }
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    await employee.update(req.body);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    await employee.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
};