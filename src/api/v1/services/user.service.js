import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { transMail, transValidation } from "../lang/vi";
import { emailService } from "./email.service";
const salRounds = 7;
const createUser = async (userBody, protocol, host) => {
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
    const newUser = await UserModel.create(userItem);
    if (newUser) {
      const linkActive = `${protocol}://${host}/verify/${newUser.createAt}`;
      await emailService.sendEmail(
        email,
        transMail.subject,
        transMail.template(linkActive),
        newUser
      );
      return newUser;
    }
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
