import {
  getParcels,
  createParcel,
  updateParcel,
} from "../../src/server/controllers/parcels";
import router from "../../src/server/helpers/router";

const config = {
  GET: getParcels,
  POST: createParcel,
  PUT: updateParcel,
};
export default router(config);
