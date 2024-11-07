import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      res.status(404).json({ error: "No Categories were found!" });
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
      res.status(400).json({ error: "Invalid ID parameter!" });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: validID,
      },
    });
    if (!category) {
      res.status(404).json({ error: " Category was not found!" });
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
      res.status(422).json({ nameError: "Name is required" });
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
      res.status(400).json({ error: "Invalid ID parameter!" });
    }
    if (!newCategoryName) {
      res.status(400).json({ error: "Category must have a title!" });
    }
    if (
      !(await prisma.category.findUnique({
        where: {
          id: validID,
        },
      }))
    ) {
      res.status(404).json({ error: " Category was not found!" });
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
      res.status(400).json({ error: "Invalid ID parameter!" });
    }

    if (
      !(await prisma.category.findUnique({
        where: {
          id: validID,
        },
      }))
    ) {
      res.status(404).json({ error: " Category was not found!" });
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
