import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    gender: { type: String, default: "Male" },
    isActive: { type: Boolean, default: false },
    createAt: { type: Number, default: Date.now },
    updateAt: { type: Number, default: null },
    deleteAt: { type: Number, default: null },
  },
  {
    collection: "users",
  }
);
UserSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("Error", error);
  }
};
const UserModel = mongoose.model("user", UserSchema);
export { UserModel };
