import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      throw createHttpError(404, "Categories were not found");
    }
    res.status(201).json(categories);
  } catch (e) {
    console.log(`error: ${e}`);
    next(e);
  }
};

export const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validID = validateID(id);

    if (!validID) {
      throw createHttpError(400, "Invalid Category ID");
    }

    const category = await prisma.category.findUnique({
      where: {
        id: validID,
      },
    });
    if (!category) {
      throw createHttpError(404, "Category not found");
    }
    res.status(201).json(category);
  } catch (e) {
    console.log(`error: ${e}`);
    next(e);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const categoryName = req.body.name;

    if (!categoryName) {
      throw createHttpError(400, "Category must have a title");
    }

    const existingName = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (existingName) {
      res
        .status(409)
        .json({ error: `${categoryName} already exists in the categories` });
    }
    const newCategory = await prisma.category.create({
      data: { name: categoryName },
    });
    res.status(201).json(newCategory);
  } catch (e) {
    console.log(`error: ${e}`);
    next(e);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validID = validateID(id);
    const newCategoryName = req.body.name;

    if (!validID) {
      throw createHttpError(400, "Invalid Category ID");
    }
    if (!newCategoryName) {
      throw createHttpError(400, "Category must have a title");
    }
    if (
      !(await prisma.category.findUnique({
        where: {
          id: validID,
        },
      }))
    ) {
      throw createHttpError(404, "Category not found");
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: validID,
      },
      data: {
        name: newCategoryName,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (e) {
    console.log(`error: ${e}`);
    next(e);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validID = validateID(id);

    if (!validID) {
      throw createHttpError(400, "Invalid Category ID");
    }

    if (
      !(await prisma.category.findUnique({
        where: {
          id: validID,
        },
      }))
    ) {
      throw createHttpError(404, "Category not found");
    } else {
      await prisma.category.delete({
        where: {
          id: validID,
        },
      });
      res.sendStatus(204);
    }
  } catch (e) {
    console.log(`error: ${e}`);
    next(e);
  }
};

function validateID(id: string) {
  const idNumber = Number(id);
  return isNaN(idNumber) ? undefined : idNumber;
}
