import { CONFIG } from "common/config.common";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "models/user.model";

/**
 * @description authorize all roles to use the route
 */

export const authorizeJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token);
    if (!token) {
      throw new Error();
    }

    const decoded: any = jwt.verify(token, CONFIG.JWT_ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

/**
 * @description setting user obj for every request
 */
export const setUserAndUserObj: RequestHandler = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  let token = authorization && authorization.split("Bearer ")[1];
  if (!token && typeof req.query.token == "string") {
    token = req.query.token;
  }
  if (token) {
    try {
      const decoded: any = jwt.verify(token, CONFIG.JWT_ACCESS_TOKEN_SECRET);
      if (decoded) {
        req.user = decoded;
      }

      if (req.user) {
        req.user.userObj = await User.findById(decoded.userId).lean().exec();
      }
    } catch (e) {
      console.error(e);
      res.status(401).json({ message: "Invalid Token" });
      return;
    }
  }
  next();
};
