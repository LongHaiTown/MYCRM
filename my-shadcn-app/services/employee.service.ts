import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006/api';

export interface Employee {
  id: number;
  name: string;
  phone?: string; 
  email: string;
  role: string;
  department_id: number;
  created_at: string;
  updated_at: string;
}

// Get all employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Get employee by ID
export const getEmployeeById = (id: number) => axios.get(`${API_URL}/employees/${id}`);

// Create new employee
export const createEmployee = async (employeeData: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const response = await axios.post(`${API_URL}/employees`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// Update employee
export const updateEmployee = async (id: number, employeeData: Partial<Employee>) => {
  try {
    const response = await axios.put(`${API_URL}/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

// Delete employee
export const deleteEmployee = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
}; 

export const getManagers = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees/by-role/manager`);
    return response.data;
  } catch (error) {
    console.error('Error fetching managers:', error);
    throw error;
  }
};
