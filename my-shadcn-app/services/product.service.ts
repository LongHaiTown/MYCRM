import axios from 'axios';

export type Product = {
  id: number;
  name: string;
  listedPrice: number;
  salePrice: number;
  colors: string[];
  status: 'available' | 'discontinued';
  year: number;
  type: 'electric-sedan' | 'electric-SUV' | 'bike' | 'truck';
  description?: string;
  images?: string[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006/api';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Product> => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await axios.post(`${API_URL}/products`, product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
}; 