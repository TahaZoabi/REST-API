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
    console.log(`error: ${e}`);
    return res.status(500).json({ error: e.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const validID = validateID(id);

    if (!validID) {
      return res.status(400).json({ error: "Invalid ID parameter!" });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: validID,
      },
    });
    if (!category) {
      return res.status(404).json({ error: " Category was not found!" });
    }
    return res.status(201).json(category);
  } catch (e) {
    console.log(`error: ${e}`);
    return res.status(500).json({ error: `${e.message}` });
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
    console.log(`error: ${e}`);
    return res.status(500).json({ error: e.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const validID = validateID(id);

    if (!validID) {
      return res.status(400).json({ error: "Invalid ID parameter!" });
    }

    if (
      !(await prisma.category.findUnique({
        where: {
          id: validID,
        },
      }))
    ) {
      return res.status(404).json({ error: " Category was not found!" });
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
    return res.status(500).json({ error: `${e.message}` });
  }
};

function validateID(id) {
  const idNumber = Number(id);
  return isNaN(idNumber) ? null : idNumber;
}
