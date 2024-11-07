import Router from "express";
import * as CategoryController from "../controllers/categoryController";

const router = Router();
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategory);
router.post("/", CategoryController.createCategory);
router.patch("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
