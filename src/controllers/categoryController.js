import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      return res.status(404).json({ error: "No Categories were found!" });
    }
    return res.status(201).json(categories);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const categoryName = req.body.name;

    if (!categoryName) {
      return res.status(422).json({ nameError: "Name is required" });
    }

    const existingName = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (existingName) {
      return res
        .status(409)
        .json({ error: `${categoryName} already exists in the categories` });
    }
    const newCategory = await prisma.category.create({
      data: { name: categoryName },
    });
    return res.status(201).json(newCategory);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
