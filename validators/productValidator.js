import Joi from "joi";

export const productSchema = Joi.object({
  image: Joi.string().uri().required().messages({
    "string.base": "Image must be a string",
    "string.uri": "Image must be a valid URL",
    "any.required": "Image is required",
  }),
  itemName: Joi.string().trim().min(2).required().messages({
    "string.empty": "Item name cannot be empty",
  }),
  category: Joi.string().trim().required().messages({
    "string.empty": "Category is required",
  }),
  description: Joi.string().trim().required(),
  price: Joi.number().integer().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Stock status must be a number",
    "number.min": "Stock status cannot be negative",
    "any.required": "Stock status is required",
  }),
  sellerName: Joi.string().required(),
  sellerLocation: Joi.string().required(),
  sellerNumber: Joi.string()
    .pattern(/^\+88\d{11}$/)
    .messages({
      "string.pattern.base": "Seller number must be a valid Bangladeshi number",
    }),
  rating: Joi.number().min(0).max(5).precision(1).default(0).messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating cannot be less than 0",
    "number.max": "Rating cannot exceed 5",
  }),
  reviews: Joi.array().items(
    Joi.object({
      reviewerName: Joi.string().required(),
      comment: Joi.string().required(),
      rating: Joi.number().min(0).max(5).precision(1).optional(),
    })
  ),
  unit: Joi.string().valid("kg", "pieces", "liters", "bags").optional(),
  startDate: Joi.date()
    .iso()
    .default(() => new Date()),
  expiryDate: Joi.date().iso().optional().default([]),
});
