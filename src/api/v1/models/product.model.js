import mongoose from "mongoose";
import { paginate } from "./plugins/paginate.plugin";
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    price: {
      type: Number,
      require: true,
    },
    dateOfManufacture: {
      type: Number,
      require: true,
    },
    expirationDate: {
      type: Number,
      require: true,
    },
    deleteAt: { type: Number, default: null },
  },
  {
    collection: "products",
    timestamps: true,
  }
);
ProductSchema.plugin(paginate);
const ProductModel = mongoose.model("product", ProductSchema);
export { ProductModel };
