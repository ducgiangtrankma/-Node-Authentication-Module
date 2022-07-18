import createHttpError from "http-errors";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { client } from "../../../config/connection_redis";

const generateToken = (userId, expires, secret) => {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, secret, {
    expiresIn: expires,
  });
};
const generateRefreshToken = (userId, expires, secret) => {
  const payload = {
    id: userId,
    iat: Math.floor(Date.now() / 1000) - 30,
    expiresIn: expires,
    // type,
  };
  const refreshToken = jwt.sign(payload, secret);
  if (refreshToken) {
    client.set(userId.toString(), refreshToken);
    client.expire(userId.toString(), 86400);
    return refreshToken;
  }
};
const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized());
  }
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, payload) => {
    if (error) {
      if (error.name === "JsonWebTokenError") {
        return next({
          status: 401,
          message: createHttpError.Unauthorized(),
        });
      }
      return next({
        status: 401,
        message: error.message,
      });
    }
    req.payload = payload;
    next();
  });
};

const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_KEY,
    async (error, payload) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          return next({
            status: 401,
            message: createHttpError.Unauthorized(),
          });
        }
        return next({
          status: 401,
          message: error.message,
        });
      }
      const value = await client.get(payload.id);
      if (refreshToken !== value) {
        return next({
          status: httpStatus.BAD_REQUEST,
          message: "Error",
        });
      }
      req.payload = payload;
      next();
    }
  );
};

export const tokenService = {
  generateToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
