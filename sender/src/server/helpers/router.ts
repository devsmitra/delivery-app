import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { verify } from "./token";
import { User } from "../typings/user";

export type Method = "GET" | "POST" | "PUT";
export type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

const initMiddleware =
  (middleware: any) => (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT"],
  })
);

const isAuthorized = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.headers.authorization;
  let code = 200;
  try {
    // Checking if url is not login
    if (!req?.url?.includes("/login")) {
      // Checking if token is present
      if (auth) {
        const user: User = await verify(auth);
        req.previewData = user;

        // Checking token app name is similar to header app
        if (user?.app !== req.headers["app"]) code = 401;
      } else {
        code = 401;
      }
    }
  } catch (error) {
    console.error(error);
    code = 401;
  }

  const isValid = code === 200;
  if (!isValid) {
    res.status(code).json({
      message: "Invalid Token",
    });
  }
  return isValid;
};

const router =
  (config: { [x: string]: Handler }) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await cors(req, res);
      const isValid = await isAuthorized(req, res);
      const { method } = req;
      const handler = config[method as Method];
      if (handler) {
        return isValid ? handler(req, res) : null;
      }
      return res.status(405).end(`Method ${method} Not Allowed`);
    } catch (error) {
      return res.status(400).end("Something went wrong");
    }
  };

export default router;
