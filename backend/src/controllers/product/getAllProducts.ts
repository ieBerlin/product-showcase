import { Request, Response } from "express";
import Product from "../../models/Product";

async function getAllProducts(req: Request, res: Response): Promise<any> {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export default getAllProducts;
