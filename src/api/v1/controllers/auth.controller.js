import { catchAsync } from "../helpers/catchAsync";
import { userService } from "../services/user.service";

const register = catchAsync(async (req, res, next) => {
  const user = await userService.createUser(req.body);
  return res.status(200).json(user);
});

export const authController = {
  register,
};
