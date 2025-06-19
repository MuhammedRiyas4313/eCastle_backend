import bcrypt from "bcrypt";

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
