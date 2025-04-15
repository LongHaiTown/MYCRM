import axios from "axios";

const API_URL = "http://localhost:3006/api";

// Get all employees
export const getEmployees = () => axios.get(`${API_URL}/employees`);

// Get employee by ID
export const getEmployeeById = (id: number) => axios.get(`${API_URL}/employees/${id}`);

// Create new employee
export const createEmployee = (data: {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}) => axios.post(`${API_URL}/employees`, data);

// Update employee
export const updateEmployee = (id: number, data: {
  name?: string;
  email?: string;
  role?: string;
  department?: string;
  status?: string;
}) => axios.put(`${API_URL}/employees/${id}`, data);

// Delete employee
export const deleteEmployee = (id: number) => axios.delete(`${API_URL}/employees/${id}`); 