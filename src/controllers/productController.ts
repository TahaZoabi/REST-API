import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { ProductBody, ProductParams } from "../lib/interface";

const prisma = new PrismaClient();

export const getProducts: RequestHandler = async (_, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    });
    if (!products) {
      res.status(404).json({ error: "No products were found" });
    }
    res.status(200).json(products);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validateId = validateProductId(id);
    if (!validateId.success) {
      res.status(400).json({ error: validateId.message });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    });

    if (!product) {
      res.status(404).json({ error: "Product was not found" });
    }

    res.status(200).json(product);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

export const createProduct: RequestHandler<{}, {}, ProductBody> = async (
  req,
  res,
) => {
  try {
    const productData = req.body;
    const validateFields = validateProductFields(req.body);

    if (!validateFields.success) {
      res.status(400).json({ error: validateFields.message });
    }

    const newProduct = await prisma.product.create({
      data: productData,
    });
    res.status(201).json(newProduct);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const validateId = validateProductId(id);
    if (!validateId.success) {
      res.status(400).json({ error: validateId.message });
    }
    const validateFields = validateProductFields(req.body);

    if (!validateFields.success) {
      res.status(400).json({ error: validateFields.message });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      res.status(404).json({ error: "Product was not found" });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: productData,
    });

    res.status(200).json(updatedProduct);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

export const deleteProduct: RequestHandler<ProductParams> = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    const validateId = validateProductId(id);
    if (!validateId.success) {
      res.status(400).json({ error: validateId.message });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      res.status(404).json({ error: "No products were found " });
    }

    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.sendStatus(204);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

function validateProductId(id: string) {
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    return { success: false, message: "Invalid Category ID" };
  }
  return { success: true };
}

function validateProductFields({
  name,
  price,
  quanity,
  categoryId,
}: ProductBody) {
  if (!name) {
    return { success: false, message: `name filed is required` };
  } else if (!price) {
    return { success: false, message: `price filed is required` };
  } else if (!quanity) {
    return { success: false, message: `quanity filed is required` };
  } else if (!categoryId) {
    return { success: false, message: `categoryId filed is required` };
  } else {
    return { success: true };
  }
}
