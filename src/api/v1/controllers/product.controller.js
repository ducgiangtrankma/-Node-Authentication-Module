import { catchAsync } from "../helpers/catchAsync";
import { productService } from "../services/product.service";
import { pick } from "../utils/pick";

const getListProducts = catchAsync(async (req, res, next) => {
  const filter = pick(req.query, [
    "_id",
    "name",
    "price",
    "dateOfManufacture",
    "expirationDate",
  ]);
  const options = pick(req.query, ["sortBy", "populate", "limit", "page"]);
  const products = await productService.queryProducts(filter, options);
  res.status(200).send(products);
});
export const productController = {
  getListProducts,
};
/**
 * Example
 * 1. GetAll - Default page = 1, limit = 10 : http://localhost:8082/api/v1/products/list
 * 2. Get page = 10, limit = 15: http://localhost:8082/api/v1/products/list?page=2&limit=15
 * 3. Query name, price: http://localhost:8082/api/v1/products/list?name=Gorgeous Granite Towels&price=731&page=1&limit=15
 * 4. Với các query phức tạp nên sử dụng post để đẩy query vào body để dễ sử lý và đảm bảo an toàn bảo mật
 */
