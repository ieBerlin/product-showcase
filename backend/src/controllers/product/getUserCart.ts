import { Request, Response } from "express";
import User from "../../models/User";
async function getUserCart(req: Request, res: Response): Promise<any> {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("cartList");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      cart: user.cartList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export default getUserCart;
