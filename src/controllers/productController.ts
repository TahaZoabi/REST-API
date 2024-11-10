import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { ProductBody } from "../lib/interface";

const prisma = new PrismaClient();

export const getProducts: RequestHandler = async (_, res) => {
  const products = await prisma.product.findMany();
  if (!products) {
    res.status(404).json({ error: "No products were found" });
  }
  res.status(200).json(products);
};

export const createProduct: RequestHandler<{}, {}, ProductBody> = async (
  req,
  res,
) => {
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
};
