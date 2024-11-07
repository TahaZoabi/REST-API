import express from "express";
import * as CategoryController from "../controllers/categoryController";

const router = express.Router();
router.get("/categories", CategoryController.getCategories);
router.get("/categories/:id", CategoryController.getCategory);
router.post("/categories", CategoryController.createCategory);
router.patch("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

export default router;
