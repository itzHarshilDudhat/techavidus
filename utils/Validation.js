import { check, validationResult } from "express-validator";
export const validateDeleteProduct = [
  check("productId,", "Product Id missing!").not().isEmpty(),
];

export const validationDeleteProductError = (req, res, next) => {
  const error = validationResult(req.body);
  if (!error.isEmpty()) {
    return res.json({
      status: 400,
      message: error.array()[0].msg,
      data: [],
    });
  } else {
    next();
  }
};
