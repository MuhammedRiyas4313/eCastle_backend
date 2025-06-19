import { STATUS_CODES } from "common/constant.common";
import { RequestHandler } from "express";

export const indexGet: RequestHandler = async (req, res, next) => {
  try {
    res.status(STATUS_CODES.OK).send("Hello world!");
  } catch (error) {
    next(error);
  }
};
