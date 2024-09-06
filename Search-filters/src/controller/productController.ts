// controllers/productController.ts

import { Request, Response } from 'express';
import Producto from '../models/productModel'; // Importamos el modelo tipado

// Helper function to get query params as string
const getQueryParam = (query: any, key: string): string | undefined => {
  if (Array.isArray(query[key])) {
    return query[key][0]; // Solo toma el primer valor si es un array
  }
  return query[key] as string | undefined;
};

// Controlador para buscar productos por nombre
export const buscarPorNombre = async (req: Request, res: Response): Promise<void> => {
  const nombre = getQueryParam(req.query, 'nombre');

  try {
    const productos = await Producto.findAll({
      where: { nombre }
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al buscar productos.' });
  }
};

// Controlador para buscar productos por categoría
export const buscarPorCategoria = async (req: Request, res: Response): Promise<void> => {
  const categoria = getQueryParam(req.query, 'categoria');

  try {
    const productos = await Producto.findAll({
      where: { categoria }
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al buscar productos.' });
  }
};

// Controlador para buscar productos por nombre y categoría
export const buscarPorNombreYCategoria = async (req: Request, res: Response): Promise<void> => {
  const nombre = getQueryParam(req.query, 'nombre');
  const categoria = getQueryParam(req.query, 'categoria');

  try {
    const productos = await Producto.findAll({
      where: { nombre, categoria }
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al buscar productos.' });
  }
};

// Controlador para buscar productos por nombre y tela
export const buscarPorNombreYTela = async (req: Request, res: Response): Promise<void> => {
  const nombre = getQueryParam(req.query, 'nombre');
  const tela = getQueryParam(req.query, 'tela');

  try {
    const productos = await Producto.findAll({
      where: { nombre, tela }
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al buscar productos.' });
  }
};
