import Router from "express";
import * as ProductController from "../controllers/productController";
const router = Router();

router.get("/", ProductController.getProducts);
router.post("/", ProductController.createProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
