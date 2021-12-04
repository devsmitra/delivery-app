import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../typings/Response";
import { users } from "../mock/Users";
import { User } from "../typings/user";
import { sign } from "../helpers/token";

interface UserResponse {
  user: User;
  token: string;
}

export const login = async (
  req: NextApiRequest,
  res: NextApiResponse<Response<UserResponse>>
): Promise<void> => {
  const { email, password } = req.body;
  const { app } = req.headers;
  const user = users.find(
    (u) => u.email === email && u.role === app?.toLowerCase()
  );
  if (!user || user.password !== password) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  const result = { ...user, password: undefined } as unknown as User;
  const token = await sign(result);
  return res.status(200).json({
    message: "Login Successful",
    data: {
      token,
      user: result,
    },
  });
};
