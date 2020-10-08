"use strict";

var _open = _interopRequireDefault(require("open"));

var _app = _interopRequireDefault(require("./app"));

var _settings = require("./settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let server = null;

const done = (from, app) => () => {
  server = app.listen({
    port: _settings.settings.APP.PORT,
    host: "0.0.0.0"
  }, () => {
    console.log("index.js", {
      from,
      msg: `🚀 Server ready at http://${"localhost"}:${_settings.settings.APP.PORT}`
    });
    (0, _open.default)(`http://${"localhost"}:${_settings.settings.APP.PORT}`);
  });
};

process.once("SIGUSR2", () => {
  console.log("index.js", {
    build: "Killing server"
  });

  if (server) {
    server.close(() => {
      console.log("index.js", {
        msg: "Server Closed"
      });
      process.kill(process.pid, "SIGUSR2");
    });
  } else {
    console.log("index.js", {
      msg: "No Server to Kill"
    });
  }
});
(0, _app.default)(done);