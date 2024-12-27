import { Request, Response } from "express";
import User from "../../models/User";

async function updateCart(req: Request, res: Response): Promise<any> {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const productIndex = user.cartList.findIndex(
      (itemId) => itemId === productId
    );

    if (productIndex !== -1) {
      user.cartList[productIndex].quantity = quantity;
    } else {
      user.cartList.push({ id: productId, quantity });
    }

    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Cart updated",
        cart: user.cartList,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export default updateCart;
