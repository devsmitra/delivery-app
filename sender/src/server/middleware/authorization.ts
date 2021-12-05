import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "../helpers/token";

export const isAuthorized = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> => {
  const auth = req.headers.authorization;
  let code = 200;
  try {
    // Checking if url is not login
    if (!req?.url?.includes("/login")) {
      // Checking if token is present
      if (auth) {
        const user = await verify(auth);
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

export default isAuthorized;
