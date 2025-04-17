import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006/api';

export interface Department {
  id: number;
  name: string;
  code: string;
  manager: string;
  managerAvatar: string;
  employeeCount: number;
  targetAmount: number;
  currentAmount: number;
  progress: number;
  created_at: string;
  updated_at: string;
}

// Get all departments
export const getDepartments = async () => {
  try {
    const response = await axios.get(`${API_URL}/departments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

// Get department by ID
export const getDepartmentById = (id: number) => axios.get(`${API_URL}/departments/${id}`);

// Create new department
export const createDepartment = async (departmentData: Omit<Department, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const response = await axios.post(`${API_URL}/departments`, departmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

// Update department
export const updateDepartment = async (id: number, departmentData: Partial<Department>) => {
  try {
    const response = await axios.put(`${API_URL}/departments/${id}`, departmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating department:', error);
    throw error;
  }
};

// Delete department
export const deleteDepartment = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error;
  }
}; 