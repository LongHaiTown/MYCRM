import { Request, Response } from 'express';
import Employee from '../models/employee.model';

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll();
    return res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching employee',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body); // Debug log

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is empty',
      });
    }

    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        required: ['name', 'email', 'role'],
      });
    }

    const newEmployee = await Employee.create({ name, email, role });
    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: newEmployee,
    });
  } catch (error: any) {
    console.error('Error creating employee:', error); // Debug log

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map((err: any) => ({
          field: err.path,
          message: err.message,
        })),
      });
    }

    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
        error: error.message,
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Error creating employee',
      error: error.message || error,
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }
    await employee.update(req.body);
    return res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error updating employee',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }
    await employee.destroy();
    return res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error instanceof Error ? error.message : error,
    });
  }
};