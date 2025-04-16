import { Request, Response } from 'express';
import Product from '../models/product.model';

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
}; 