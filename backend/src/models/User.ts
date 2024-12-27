import { Document, model, Schema } from "mongoose";

type ProductItem = {
  id: string;
  quantity: number;
};

export interface IUser extends Document {
  email: string;
  password: string;
  wishlist: ProductItem[];
  cartList: ProductItem[];
  createdAt: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: {
    type: [
      {
        id: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  },
  cartList: {
    type: [
      {
        id: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const User = model<IUser>("User", UserSchema, "User");

export default User;
