import createHttpError from "http-errors";
import { client } from "../../../config/connection_redis";
import { transError } from "../lang/vi";
import { UserModel } from "../models/user.model";
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    throw createHttpError(401, transError.email_password_incorrect);
  }
  const isValidPassword = await user.isCheckPassword(password);
  if (!isValidPassword) {
    throw createHttpError(401, transError.email_password_incorrect);
  }
  return user;
};

const logout = async (req, res, next) => {
  const { id } = req.payload; // user_id
  const deleteRefreshToken = await client.del(id.toString());
  if (deleteRefreshToken) {
    return deleteRefreshToken;
  } else {
    throw createHttpError(500, transError.server_error);
  }
};

export const authService = {
  login,
  logout,
};
