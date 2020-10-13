import open from "open";
import app from "./app";
import { RunMode } from "./common/types";

const IS_FACTABLE_DEV = process.env.FACTABLE_DEV === "true";
const IS_DEV = process.env.NODE_ENV !== RunMode.PROD;
const IS_TEST = process.env.NODE_ENV === RunMode.TEST;

console.log("process.env.FACTABLE_DEV: ", process.env.FACTABLE_DEV);

let server = null;
const done = (from, app, port) => () => {
  server = app.listen({ port, host: "0.0.0.0" }, () => {
    console.log("index.js", {
      from,
      msg: `🚀 Server ready at http://${"localhost"}:${port}`,
    });
    if (!IS_FACTABLE_DEV) {
      open(`http://${"localhost"}:${port}`);
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

const run = (port) => {
  app(done, port);
};

export default run;
