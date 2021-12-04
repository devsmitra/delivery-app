import jwt from "jsonwebtoken";
import { promisify } from "util";

const secret = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const defaultOptions = {
  expiresIn: "1h",
};

export const sign = (payload: any, options?: any): Promise<string> => {
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
          reject(err);
        } else {
          resolve(token as string);
        }
      }
    );
  });
};

export const verify = (token: string, options?: any): any => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      {
        ...defaultOptions,
        ...options,
      },
      function (err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });
};
