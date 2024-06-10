import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "sst-auth-react",
      region: "eu-north-1",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
