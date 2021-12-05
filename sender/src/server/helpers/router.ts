import { NextApiRequest, NextApiResponse } from "next";
import isAuthorized from "../middleware/authorization";
import cors from "../middleware/cors";

export type Method = "GET" | "POST" | "PUT";
export type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

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
