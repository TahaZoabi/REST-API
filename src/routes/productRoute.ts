import Router from "express";
import * as ProductController from "../controllers/productController";
const router = Router();

router.get("/", ProductController.getProducts);
router.post("/", ProductController.createProduct);
router.get("/:id", ProductController.getProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
