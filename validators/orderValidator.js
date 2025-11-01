import Joi from "joi";

export const orderSchema = Joi.object({
  productId: Joi.string().required(),
  productName: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().required(),
  sellerNumber: Joi.string()
    .pattern(/^\+88\d{11}$/)
    .required()
    .messages({
      "string.pattern.base": "Seller number must be an 11-digit number",
      "any.required": "Seller number is required",
    }),
  sellerName: Joi.string().required(),
  buyerNumber: Joi.string()
    .pattern(/^\+88\d{11}$/)
    .messages({
      "string.pattern.base": "Buyer number must be an 11-digit number",
    }),
  status: Joi.string()
    .valid("pending", "shipped", "delivered", "cancelled")
    .required(),
  orderDate: Joi.date().default(() => new Date()),
});
