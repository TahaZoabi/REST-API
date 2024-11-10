import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { ProductBody } from "../lib/interface";

const prisma = new PrismaClient();

export const createProduct: RequestHandler<{}, {}, ProductBody> = async (
  req,
  res,
) => {
  try {
    const { name, price, quanity, categoryId } = req.body;

    if (!name || !price || !quanity || !categoryId) {
      res.status(400).json({ error: "required fields  missing " });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        quanity,
        categoryId,
      },
    });
    res.status(201).json(newProduct);
  } catch (e) {
    console.log(`error: ${e}`);
  }
};
