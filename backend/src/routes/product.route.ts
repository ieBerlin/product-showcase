import { Router } from "express";
import getUserCart from "../controllers/product/getUserCart";
import getUserWishList from "../controllers/product/getUserWishList";
import getAllProducts from "../controllers/product/getAllProducts";
import addProduct from "../controllers/product/addProduct";
import getProduct from "../controllers/product/getProduct";
import updateWishlist from "../controllers/product/updateWishlist";
import updateCart from "../controllers/product/updateCart";
import { validateProduct, validateRequest } from "../utils/validators";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.get("/:userId/cart", getUserCart);
productRouter.get("/:userId/wishlist", getUserWishList);
productRouter.post("/", validateRequest(validateProduct), addProduct);
productRouter.put("/:userId/wishlist", updateWishlist);
productRouter.put("/:userId/cart", updateCart);

export default productRouter;
