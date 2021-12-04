import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../typings/Response";
import { User } from "../typings/user";
import { users } from "../mock/Users";

export const login = (
  req: NextApiRequest,
  res: NextApiResponse<Response<User>>
): void => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const result = { ...user, password: undefined } as unknown as User;
  return res.status(200).json({
    message: "Login Successful",
    data: result,
  });
};
