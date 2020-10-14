const WebSocket = require("ws");
const path = require("path");

const { safeJsonStringify, msgWrapper } = require("../server/common/utils");

const resolvePath = (p) => path.resolve(__dirname, p);

class FactableEvidencer {
  constructor(config) {
    // console.log("FactableEvidencer STARTING..", config);
    this.port = config.port;
    this.pending = [];
    this.socket_ready = false;
    this.socket = false;
    this.reatemptTimeout = false;

    this.initConnection();
  }

  initConnection() {
    // console.log("CONNECTING..");
    if (this.reatemptTimeout) {
      clearTimeout(this.reatemptTimeout);
    }
    this.socket = new WebSocket(`ws://localhost:${this.port}`);
    this.socket.on("error", (err) => {
      this.socket_ready = false;
      // console.log("SOCKET ERROR");
      // console.error(
      //   "Socket encountered error: ",
      //   err.message,
      //   "Closing socket"
      // );
      this.socket.close();
      this.reatemptTimeout = setTimeout(() => {
        this.initConnection();
      }, 2000);
    });
    this.socket.on("open", this.heartbeat.bind(this));
    // this.socket.on("ping", this.heartbeat.bind(this));
    this.socket.on("close", () => {
      this.socket_ready = false;
      this.initConnection();
    });
  }

  processPending() {
    if (this.socket_ready) {
      while (this.pending.length) {
        const current = this.pending.shift();
        // console.log("sending call..");
        this.socket.send(
          safeJsonStringify(msgWrapper("registerFunctionCall", current))
        );
      }
    }
  }

  heartbeat() {
    this.socket_ready = true;
    this.processPending();
  }

  registerFunctionCall(args, output, metadata) {
    // console.log("registerFunctionCall: ", metadata.name);
    const millis = new Date().valueOf().toString();
    this.pending.push({ args, output, metadata, millis });
    this.processPending();
  }
}

class Singleton {
  constructor(config) {
    if (!Singleton.instance) {
      Singleton.instance = new FactableEvidencer(config);
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
