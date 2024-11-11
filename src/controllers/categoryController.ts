import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { CategoryBody, CategoryParams } from "../lib/interface";

const prisma = new PrismaClient();

export const getCategories: RequestHandler = async (_, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          select: {
            name: true,
            price: true,
            quanity: true,
            isActive: true,
          },
        },
      },
    });
    if (!categories) {
      res.status(404).json({ error: "Categories were not found" });
    }
    res.status(201).json(categories);
  } catch (e) {
    console.log(`error: ${e}`);
    next(e);
  }
};

export const getCategory: RequestHandler<CategoryParams> = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid Category ID" });
    }

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: {
          select: {
            name: true,
            price: true,
            quanity: true,
            isActive: true,
          },
        },
      },
    });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
    }
    res.status(201).json(category);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

export const createCategory: RequestHandler<
  CategoryParams,
  {},
  CategoryBody
> = async (req, res) => {
  try {
    const { name } = req.body;
    const validateName = await validateCategoryName(name);
    if (!validateName.success) {
      res.status(400).json({ error: validateName.message });
    }
    const newCategory = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(newCategory);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

export const updateCategory: RequestHandler<
  CategoryParams,
  {},
  CategoryBody
> = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid Category ID" });
    }

    const validateName = await validateCategoryName(req.body.name);
    if (!validateName.success) {
      res.status(409).json({ error: validateName.message });
    }
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
    }

    const { name } = req.body;
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

export const deleteCategory: RequestHandler<CategoryParams> = async (
  req,
  res,
) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid Category ID" });
    }

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
    }
    await prisma.category.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

async function validateCategoryName(categoryName: string) {
  if (!categoryName) {
    return { success: false, message: "Category must have a title" };
  }

  const existingName = await prisma.category.findUnique({
    where: { name: categoryName },
  });

  if (existingName) {
    return {
      success: false,
      message: `${categoryName} already exists in the categories`,
    };
  }

  return { success: true };
}
