import { z } from "zod";

export const userSchema = z
  .object({
    email: z.string().nonempty("Email is required!"),
    password: z.string().nonempty("Password is required!"),
  })
  .strict();
