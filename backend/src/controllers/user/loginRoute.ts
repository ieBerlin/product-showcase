import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { sign } from "jsonwebtoken";

async function loginRoute(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const payload = {
      userId: admin._id,
      email: admin.email,
    };
    const token = sign(payload, process.env.JWT_SECRET || "hendi", {
      expiresIn: "24h",
    });
    return res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
export default loginRoute;
