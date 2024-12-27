import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validateProduct = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    isAvailable: Joi.boolean().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

export const validateUser = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    wishlist: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          quantity: Joi.number().integer().min(0).required(),
        })
      )
      .optional(),
    cartList: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          quantity: Joi.number().integer().min(0).required(),
        })
      )
      .optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

export function validateRequest(
  validator: (data: any) => Joi.ValidationResult
): any {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
}
