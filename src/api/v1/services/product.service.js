import { ProductModel } from "../models/product.model";

const queryProducts = async (filter, options) => {
  const products = await ProductModel.paginate(filter, options);
  return products;
};

const getListProducts = async (req, res, next) => {
  console.log("Get list service");
};
export const productService = {
  getListProducts,
  queryProducts,
};
