import Router from "express";
import * as ProductController from "../controllers/productController";
const router = Router();

router.get("/", ProductController.getProducts);
router.post("/", ProductController.createProduct);

export default router;
