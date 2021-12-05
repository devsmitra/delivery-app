import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../typings/Response";
import { users } from "../mock/Users";
import { sign } from "../helpers/token";
import { User } from "../../shared/typings/User";

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
  const appName = Array.isArray(app) ? app[0] : app;

  const user = users.find(
    (u) => u.email === email && u.role === appName?.toLowerCase()
  );

  if (!user || user.password !== password) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  const result = { ...user, password: undefined } as unknown as User;
  // Generate token for user
  const token = await sign({
    ...result,
    app: req.headers.app ?? "Biker",
  });

  return res.status(200).json({
    message: "Login Successful",
    data: {
      token,
      user: result,
    },
  });
};
