import Joi from "joi";

export const userSchema = Joi.object({
  fullName: Joi.string().trim().min(2).required().messages({
    "string.empty": "Full name is required",
  }),
  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required",
  }),
  phoneNumber: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 11 digits",
      "any.required": "Phone number is required",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  subscriptionStatus: Joi.string()
    .valid("ফ্রি", "গোল্ড", "প্লাটিনাম" , "ডায়মন্ড" )
    .default("ফ্রি"),
  level: Joi.number().integer().min(0).default(0),
  rating: Joi.number().min(0).max(5).default(0),
  image: Joi.string().uri().optional(),
  role: Joi.string().valid("buyer", "seller", "admin").required(),
});
