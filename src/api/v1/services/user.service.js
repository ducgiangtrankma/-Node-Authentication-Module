import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { transValidation } from "../lang/vi";
const salRounds = 7;
const createUser = async (userBody) => {
  const { email, password, gender } = userBody;
  const userByEmail = await UserModel.findOne({
    email,
  });
  if (!userByEmail) {
    let salt = bcrypt.genSaltSync(salRounds);
    const userItem = {
      email,
      password: bcrypt.hashSync(userBody.password, salt),
      gender,
    };
    return UserModel.create(userItem);
  }
  if (userByEmail && !userByEmail.isActive) {
    throw createHttpError(422, transValidation.account_not_active);
  }
  if (userByEmail && userByEmail.isActive) {
    throw createHttpError(422, transValidation.email_in_use);
  }
};

export const userService = {
  createUser,
};
