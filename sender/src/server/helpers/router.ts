import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

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

const router =
  (config: { [x: string]: Handler }) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await cors(req, res);
      const { method } = req;
      const handler = config[method as Method];
      if (handler) {
        return handler(req, res);
      }
      return res.status(405).end(`Method ${method} Not Allowed`);
    } catch (error) {
      return res.status(405).end("Something went wrong");
    }
  };

export default router;
