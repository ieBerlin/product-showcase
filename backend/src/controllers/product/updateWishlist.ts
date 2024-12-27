import { Request, Response } from "express";
import User from "../../models/User";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { WishlistBody } from "../../types/types";

async function updateWishlist(req: Request, res: Response): Promise<any> {
  const { productId, userId, quantity }: WishlistBody = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productId) ||
    typeof quantity !== "number" ||
    quantity < 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid input data. Please check userId, productId, and quantity.",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const existingItemIndex = user.wishlist.findIndex(
      (item) => item.id === productId
    );

    if (existingItemIndex !== -1) {
      if (quantity === 0) {
        user.wishlist.splice(existingItemIndex, 1);
      } else {
        user.wishlist[existingItemIndex].quantity += quantity;
      }
    } else {
      if (quantity > 0) {
        user.wishlist.push({ id: productId, quantity });
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Wishlist updated",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export default updateWishlist;
