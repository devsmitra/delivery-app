import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../../shared/typings/User";

// Secret should be part of the environment variables and not stored in the code
// I've added in code for simplicity
const secret = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const defaultOptions: SignOptions = {
  expiresIn: "1h",
};

export const sign = (
  payload: { [k: string]: any },
  options?: SignOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        ...defaultOptions,
        ...options,
      },
      function (err, token) {
        if (err) {
          return reject(err);
        }
        return resolve(token as string);
      }
    );
  });
};

export const verify = (
  token: string,
  options?: SignOptions
): Promise<User & { app: string }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      {
        ...defaultOptions,
        ...options,
      },
      function (err, payload) {
        if (err) {
          return reject(err);
        }
        return resolve(payload as User & { app: string });
      }
    );
  });
};
