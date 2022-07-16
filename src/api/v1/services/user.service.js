import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { transError, transMail, transValidation } from "../lang/vi";
import { emailService } from "./email.service";
import { client } from "../../../config/connection_redis";
import { logEvents } from "../helpers/logEvents";

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
      const linkActive = `${protocol}://${host}/api/v1/verify/${newUser.createAt}`;
      emailService.sendEmail(
        email,
        transMail.subject,
        transMail.template(linkActive),
        newUser
      );
      // client.set(newUser._id.toString(), newUser.createAt);
      // client.expire(
      //   newUser._id.toString(),
      //   process.env.EXPIRES_TIME_ACTIVE_ACCOUNT
      // );
      return newUser;
    }
  }
  if (userByEmail && !userByEmail.isActive) {
    logEvents(transError.account_not_active);
    throw createHttpError(422, transError.account_not_active);
  }
  if (userByEmail && userByEmail.isActive) {
    throw createHttpError(422, transValidation.email_in_use);
  }
};

const verifyAccount = async (code) => {
  const userByCode = await UserModel.findOne({
    createAt: code,
  });
  if (!userByCode) {
    throw createHttpError(422, transError.account_active_fail);
  }
  return UserModel.findOneAndUpdate(
    {
      createAt: code,
    },
    {
      isActive: true,
    }
  );
};
export const userService = {
  createUser,
  verifyAccount,
};
