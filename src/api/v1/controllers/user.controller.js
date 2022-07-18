import { catchAsync } from "../helpers/catchAsync";
import { transSuccess } from "../lang/vi";
import { userService } from "../services/user.service";

const verifyAccount = catchAsync(async (req, res, next) => {
  const { code } = req.params;
  const verify = await userService.verifyAccount(code);
  if (verify) {
    return res.status(200).send(transSuccess.account_active_success);
  }
});
const getListUser = catchAsync(async (req, res, next) => {
  const users = await userService.getListUser();
  res.json({
    listUsers: users,
  });
});
export const userController = {
  verifyAccount,
  getListUser,
};
