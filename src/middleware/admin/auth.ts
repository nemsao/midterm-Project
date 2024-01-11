declare module "bcrypt";
declare module "jsonwebtoken";
declare module "node-cache";
import * as jwt from "jsonwebtoken";
import { env } from "../../interface.env";
import { NextFunction, Request, Response } from "express";


const authorizationService = async (token: string, username: string) => {
  try {
    const decodeToken = jwt.verify(token, env.SECRET_KEY);
    const user = decodeToken.toString();
    return user;
  } catch (err) {
    throw new Error("token không hợp lệ ");
  }
};

const authorizeMiddleware= async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;
    const { username } = req.params;
    if (authorization) {
      try {
        const user = await authorizationService(
          authorization.toString(),
          username
        );
        req.user = user;
        return next();
      } catch (err) {
        return res
          .status(300)
          .json({
            Error: "tài khoản đăng nhập không hợp lệ",
            Details: err.message,
          });
      }
    } else {
      return res.status(300).json({ Error: "Chưa đăng nhập" });
    }
  }

export {  authorizeMiddleware };
