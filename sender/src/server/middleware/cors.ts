import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

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

export default cors;
