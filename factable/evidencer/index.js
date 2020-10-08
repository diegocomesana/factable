const WebSocket = require("ws");
const path = require("path");
const crypto = require("crypto");
const { format } = require("prettier");

const resolvePath = (p) => path.resolve(__dirname, p);

class FactableEvidencer {
  constructor(config) {
    console.log("FactableEvidencer CONSTRUCTOR:", config);
    this.dependencies = {};
    this.executions = {};

    this.client = new WebSocket("wss://echo.websocket.org/");
    this.client.on("open", this.heartbeat);
    this.client.on("ping", this.heartbeat);
    this.client.on("close", function clear() {
      this.clearTimeout(this.pingTimeout);
    });
  }

  // https://github.com/websockets/ws#client-authentication
  heartbeat() {
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
    /*
    if (!this.executions[controllerName]) {
      this.executions[controllerName] = [];
    }
    this.executions[controllerName] = this.executions[controllerName].concat([
      {
        controllerName,
        functionName,
        arguments,
        output,
      },
    ]);
    */
    // const paramsHash = crypto
    //   .createHash("md5")
    //   .update(safeJsonStringify(args))
    //   .digest("hex");
    //   console.log(`------------------------------------------------------`);
    //   console.log(`-> ${functionName}`);
    //   console.log(`---->${paramsHash}`);
    //   console.log(`---->${safeJsonStringify(args, 2)}`);
    //   console.log(`------------------------------------------------------`);
    //   console.log(`---->${safeJsonStringify(output, 2)}`);
    //   console.log(`------------------------------------------------------`);
    //   console.log(`--`);
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

  //   regirterDependencies(dependencies, { name: controllerName }) {
  //     const functionNames = Object.keys(dependencies);
  //     console.log(
  //       "TestCaseGenerator --- regirterDependencies controller: ",
  //       controllerName,
  //       functionNames
  //     );

  //     const wrappedDeps = functionNames.reduce((acc, curr) => {
  //       acc[curr] = (...args) => {
  //         const output = dependencies[curr](...args);
  //         console.log("ejecuto " + curr);
  //         this.saveExecution(controllerName, curr, args, output);
  //         return output;
  //       };
  //       return acc;
  //     }, {});

  //     this.executions = functionNames.reduce((acc, curr) => {
  //       if (!acc[curr]) {
  //         acc[curr] = [];
  //       }
  //       return acc;
  //     }, {});

  //     console.log("executions: ", this.executions);

  //     return wrappedDeps;
  //   }

  startInteractive() {
    //   console.log("FactableEvidencer START INTERACTIVE!!:");
    // term.cyan("Please select a function to record:.\n");
    // term.singleColumnMenu(Object.keys(this.executions), function (
    //   error,
    //   response
    // ) {
    //   term("\n").eraseLineAfter.green(
    //     "#%s selected: %s (%s,%s)\n",
    //     response.selectedIndex,
    //     response.selectedText,
    //     response.x,
    //     response.y
    //   );
    //   process.exit();
    // });
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
