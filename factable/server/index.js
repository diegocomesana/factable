import open from "open";
import App from "./app";
// import blockLogger from "./packages/core/utils/logger";
import { settings } from "./settings";

let server = null;
const done = (from, app) => () => {
  server = app.listen({ port: settings.APP.PORT, host: "0.0.0.0" }, () => {
    console.log("index.js", {
      from,
      msg: `🚀 Server ready at http://${"localhost"}:${settings.APP.PORT}`,
    });
    open(`http://${"localhost"}:${settings.APP.PORT}`);
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

App(done);
