import open from "open";
import app from "./app";
import { RunMode } from "./common/types";
import { settings } from "./settings";

const IS_DEV = process.env.NODE_ENV !== RunMode.PROD;
const IS_TEST = process.env.NODE_ENV === RunMode.TEST;

let server = null;
const done = (from, app) => () => {
  server = app.listen({ port: settings.APP.PORT, host: "0.0.0.0" }, () => {
    console.log("index.js", {
      from,
      msg: `🚀 Server ready at http://${"localhost"}:${settings.APP.PORT}`,
    });
    if (!IS_DEV) {
      open(`http://${"localhost"}:${settings.APP.PORT}`);
    }
  });
};

process.once("SIGUSR2", () => {
  console.log("index.js", {
    build: "Killing server",
  });
  if (server) {
    server.close(() => {
      console.log("index.js", {
        msg: "Server Closed",
      });
      process.kill(process.pid, "SIGUSR2");
    });
  } else {
    console.log("index.js", {
      msg: "No Server to Kill",
    });
  }
});

const run = () => {
  app(done);
};

export default run;
