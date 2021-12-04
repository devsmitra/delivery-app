import { login } from "../../src/server/controllers/users";
import router from "../../src/server/helpers/router";

const config = {
  POST: login,
};
export default router(config);
