import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User";

async function signupRoute(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      wishlist: [],
      cartList: [],
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export default signupRoute;
