import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  images: { type: [String], required: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Product = model<IProduct>("Product", ProductSchema, "Product");

export default Product;
