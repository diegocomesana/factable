const WebSocket = require("ws");
const path = require("path");
const crypto = require("crypto");
const { safeJsonStringify, msgWrapper } = require("../common/utils");

const resolvePath = (p) => path.resolve(__dirname, p);

class FactableEvidencer {
  constructor(config) {
    console.log("FactableEvidencer CONSTRUCTOR:", config);
    this.pending = [];
    this.socket_ready = false;

    this.socket = new WebSocket("ws://localhost:8888");
    this.socket.on("open", this.heartbeat.bind(this));
    this.socket.on("ping", this.heartbeat.bind(this));
    this.socket.on("close", () => {
      this.socket_ready = false;
      this.clearTimeout(this.pingTimeout);
    });
  }

  processPending() {
    if (this.socket_ready) {
      while (this.pending.length) {
        const current = this.pending.shift();
        this.socket.send(
          safeJsonStringify(msgWrapper("registerFunctionCall", current))
        );
      }
    }
  }

  // https://github.com/websockets/ws#client-authentication
  heartbeat() {
    this.socket_ready = true;
    this.processPending();
    clearTimeout(this.pingTimeout);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
      this.terminate();
    }, 30000 + 1000);
  }

  registerFunctionCall(args, output, metadata) {
    const paramsHash = crypto
      .createHash("md5")
      .update(safeJsonStringify(args))
      .digest("hex");
    // console.log(`------------------------------------------------------`);
    // console.log(`-> ${metadata.name}`);
    // console.log(`---->${paramsHash}`);
    // console.log(`---->${safeJsonStringify(args, 2)}`);
    // console.log(`------------------------------------------------------`);
    // console.log(`---->${safeJsonStringify(output, 2)}`);
    // console.log(`------------------------------------------------------`);
    // console.log(`--`);

    // this.socket.send("Hello Server!");
    console.log("registerFunctionCall");

    const rand = Math.random().toString();

    this.pending.push({ args, output, metadata, paramsHash, rand });
    this.processPending();

    /*
    const fileTemplate = format(
      `
    
    const givenInput = ${safeJsonStringify(args, 2)};

    const expectedOutput = ${safeJsonStringify(output, 2)};
    
    
    `,
      { parser: "babel" }
    );

    const basePath = resolvePath(
      `../../../../test-cases/${camelToDash(functionName)}/`
    );

    ensureDirExists(basePath)
      .then((path) => {
        // console.log("lalalal ---- ", path);
        return createFile(
          resolvePath(`${basePath}/${paramsHash}.js`),
          fileTemplate
        );
      })
      .then((path) => {
        console.log(`----- ${functionName} test-case writen in ${path}`);
      })
      .catch((err) => console.log(err));
      */
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
