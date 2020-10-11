const WebSocket = require("ws");
const path = require("path");
const crypto = require("crypto");
const { safeJsonStringify, msgWrapper } = require("../server/common/utils");

const resolvePath = (p) => path.resolve(__dirname, p);

class FactableEvidencer {
  constructor(config) {
    console.log("FactableEvidencer CONSTRUCTOR fuckck:", config);
    this.pending = [];
    this.socket_ready = false;
    this.socket = false;
    this.reatemptTimeout = false;

    this.initConnection();
  }

  initConnection() {
    console.log("initConnection ");
    if (this.reatemptTimeout) {
      clearTimeout(this.reatemptTimeout);
    }
    this.socket = new WebSocket("ws://localhost:8888");
    this.socket.on("error", (err) => {
      this.socket_ready = false;
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      this.socket.close();
      this.reatemptTimeout = setTimeout(() => {
        this.initConnection();
      }, 1000);
    });
    this.socket.on("open", this.heartbeat.bind(this));
    // this.socket.on("ping", this.heartbeat.bind(this));
    this.socket.on("close", () => {
      this.socket_ready = false;
      // clearTimeout(this.pingTimeout);
      this.initConnection();
    });
  }

  processPending() {
    if (this.socket_ready) {
      while (this.pending.length) {
        const current = this.pending.shift();
        console.log("registerFunctionCall REAL");
        this.socket.send(
          safeJsonStringify(msgWrapper("registerFunctionCall", current))
        );
      }
    }
  }

  // https://github.com/websockets/ws#client-authentication
  heartbeat() {
    console.log("heartbeat");
    this.socket_ready = true;
    this.processPending();
  }

  registerFunctionCall(args, output, metadata) {
    const paramsHash = crypto
      .createHash("md5")
      .update(safeJsonStringify(args))
      .digest("hex");
    // console.log("registerFunctionCall");
    const rand = Math.random().toString();
    this.pending.push({ args, output, metadata, paramsHash, rand });
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
