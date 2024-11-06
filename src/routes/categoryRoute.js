import express from "express";
import * as CategoryController from "../controllers/categoryController.js";

const router = express.Router();
router.get("/categories", CategoryController.getCategories);
router.get("/categories/:id", CategoryController.getCategory);
router.post("/categories", CategoryController.createCategory);

export default router;