import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";
import { Category } from "../models/Category";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description } = req.body;

  try {
    const newCategory: Category = { name, description };
    await CategoryService.createCategory(newCategory);
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const { name, description } = req.body;

  try {
    const category: Category = { name, description };
    await CategoryService.updateCategory(id, category);
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    await CategoryService.deleteCategory(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
