import { ROLES, STATUS_CODES } from "common/constant.common";
import { ERROR } from "common/error.common";
import { MESSAGE } from "common/messages.common";
import { NextFunction, Request, Response } from "express";
import { User } from "models/user.model";
import { comparePassword } from "utils/bcrypt";
import { generateAccessJwt } from "utils/jwt";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: ROLES.ADMIN });
    if (!user) {
      throw new Error(ERROR.USER.INVALID_CREDENTIAL);
    }
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error(ERROR.USER.INVALID_CREDENTIAL);
    }

    const token = await generateAccessJwt({
      userId: user?._id?.toString(),
      role: user.role,
    });

    res.status(STATUS_CODES.OK).json({
      message: MESSAGE.USER.LOGGED_IN,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
