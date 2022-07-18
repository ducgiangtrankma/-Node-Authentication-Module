import { catchAsync } from "../helpers/catchAsync";
import { transError, transSuccess } from "../lang/vi";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

const register = catchAsync(async (req, res, next) => {
  const user = await userService.createUser(
    req.body,
    req.protocol,
    req.get("host")
  );
  return res.status(200).json(user);
});

const login = catchAsync(async (req, res, next) => {
  const user = await authService.login(req, res, next);
  const accessToken = tokenService.generateToken(
    user._id,
    process.env.ACCESS_TOKEN_EXPIRES,
    process.env.ACCESS_TOKEN_KEY
  );
  const refreshToken = tokenService.generateRefreshToken(
    user._id,
    process.env.REFRESH_TOKEN_EXPIRES,
    process.env.REFRESH_TOKEN_KEY
  );
  res.status(200).json({
    accessToken,
    refreshToken,
  });
});

const refreshToken = catchAsync(async (req, res, next) => {
  const payload = req.payload;
  if (payload) {
    const newAccessToken = tokenService.generateToken(
      payload.id,
      process.env.ACCESS_TOKEN_EXPIRES,
      process.env.ACCESS_TOKEN_KEY
    );
    const newRefresherToken = tokenService.generateRefreshToken(
      payload.id,
      process.env.REFRESH_TOKEN_EXPIRES,
      process.env.REFRESH_TOKEN_KEY
    );
    return res.status(200).json({
      newAccessToken,
      newRefresherToken,
    });
  }
});

const logout = catchAsync(async (req, res, next) => {
  const isLogout = await authService.logout(req, res, next);
  if (isLogout) {
    return res.status(200).json(transSuccess.logout_success);
  }
  return res.status(500).json(transError.server_error);
});

export const authController = {
  register,
  login,
  refreshToken,
  logout,
};
