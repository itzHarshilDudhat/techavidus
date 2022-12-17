import { Router } from "express";
import Image from "../../middleware/Image.js";
import {
  validateDeleteProduct,
  validationDeleteProductError,
} from "../../utils/Validation.js";
import {
  addProduct,
  allProducts,
  deleteProduct,
  editProduct,
} from "../controllers/Product.js";

const router = Router();
router.post("/addProduct", Image, addProduct);
router.put("/editProduct", Image, editProduct);
router.get("/allProducts", allProducts);
router.delete(
  "/deleteProduct",
  [validateDeleteProduct, validationDeleteProductError],
  deleteProduct
);
export default router;
