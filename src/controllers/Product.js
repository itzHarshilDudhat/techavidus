import Product from "../models/Product.js";
import { ResponseMsg } from "../../utils/ResponseMsg.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const addProduct = async (req, res) => {
  try {
    let { name, detail, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(401).json({
        message: ResponseMsg.REQUIRE_FIELDS_MISSING,
        data: [],
      });
    }
    let picture = req.pictureImgUrl;
    const already = await Product.findOne({ name });
    if (already) {
      return res.status(401).json({
        message: ResponseMsg.PRODUCT_ALREADY_EXIST,
        data: [],
      });
    }
    let totalPrice = quantity * price;
    const product = await new Product({
      name,
      detail,
      price,
      picture,
      quantity,
      totalPrice,
    }).save();
    return res.status(201).json({
      message: ResponseMsg.PRODUCT_ADDED,
      data: [product],
    });
  } catch (error) {
    return res.status(400).json({
      message: ResponseMsg.SERVER_ERROR,
      data: [],
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    let { name, detail, price, quantity, productId } = req.body;
    if (!name || !price || !quantity || !productId) {
      return res.status(401).json({
        message: ResponseMsg.REQUIRE_FIELDS_MISSING,
        data: [],
      });
    }

    let picture = req.pictureImgUrl;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(400).json({
        message: ResponseMsg.PRODUCT_NOT_EXIST,
      });
    }

    name ? (product.name = name) : "";
    detail ? (product.detail = detail) : "";
    price ? (product.price = price) : "";
    quantity ? (product.quantity = quantity) : "";
    if (picture) {
      let url = product.picture;
      url = url.slice(28);
      fs.unlink(`./public/uploads${url}`, (err) => {
        console.log(err);
      });
      product.picture = picture;
    }

    if (price || quantity) {
      product.totalPrice = product.price * product.quantity;
    }
    await product.save();

    return res.status(201).json({
      message: ResponseMsg.PRODUCT_UPDATED,
      data: [product],
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: ResponseMsg.SERVER_ERROR,
      data: [],
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.body.productId });
    if (!product) {
      return res.status(400).json({
        message: ResponseMsg.PRODUCT_NOT_EXIST,
      });
    }
    let url = product.picture;
    url = url.slice(28);
    fs.unlink(`./public/uploads${url}`, (err) => {
      console.log(err);
    });
    await product.remove();
    return res.status(200).json({
      message: ResponseMsg.PRODUCT_DELETED,
      data: [],
    });
  } catch (error) {
    return res.status(400).json({
      message: ResponseMsg.SERVER_ERROR,
      data: [],
    });
  }
};

export const allProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).json({
      message: ResponseMsg.PRODUCT_LIST,
      data: allProducts,
    });
  } catch (error) {
    return res.status(400).json({
      message: ResponseMsg.SERVER_ERROR,
      data: [],
    });
  }
};
