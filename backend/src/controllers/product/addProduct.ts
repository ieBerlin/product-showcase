import { Request, Response } from "express";
import Product from "../../models/Product";

async function addProduct(req: Request, res: Response): Promise<any> {
  try {
    const { name, description, price, category, stock, images, isAvailable } =
      req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
      isAvailable,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add product", error: "Server error" });
  }
}

export default addProduct;
