"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _url = _interopRequireDefault(require("url"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

var _ws = _interopRequireDefault(require("ws"));

var _types = require("./common/types");

var _html = require("./common/html");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pageTitle = "Factable Admin";
const IS_DEV = process.env.NODE_ENV !== _types.RunMode.PROD;
const IS_TEST = process.env.NODE_ENV === _types.RunMode.TEST;

const resolvePath = p => _path.default.resolve(__dirname, p);

const fileExists = path => {
  return new Promise((resolve, reject) => {
    _fs.default.access(path, err => {
      if (err) {
        resolve({
          exists: false,
          path,
          isDir: false
        });
        return;
      }

      const isDir = _fs.default.statSync(path).isDirectory();

      resolve({
        exists: true,
        path,
        isDir
      });
    });
  });
};

const createHttpServer = () => {
  return _http.default.createServer((req, res) => {
    const uri = _url.default.parse(req.url).pathname;

    console.log("LACHOTA: ", process.env.NODE_ENV);
    const pathPrefix = IS_DEV ? "../build/" : "";
    const filePath = resolvePath(`../${pathPrefix}client/${uri}`);
    console.log("NEW REQUEST: ");
    console.log("uri: ", uri);
    console.log("filename: ", filePath);

    if (uri === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.write((0, _html.buildHtml)({
        title: pageTitle,
        bundles: ["vendors.js", "main.js"]
      }));
      res.end();
      return;
    }

    fileExists(filePath).then(({
      exists,
      path,
      isDir
    }) => {
      if (!exists) {
        throw new Error("NOT FOUND!!");
      }

      if (isDir) {
        return fileExists(`${path}/index.html`);
      }

      return {
        exists,
        path,
        isDir
      };
    }).then(({
      exists,
      path,
      isDir
    }) => {
      if (!exists) {
        throw new Error("NOT FOUND!!");
      }

      return {
        exists,
        path,
        isDir
      };
    }).then(({
      exists,
      path,
      isDir
    }) => {
      _fs.default.readFile(path, "binary", (err, file) => {
        if (err) {
          res.writeHead(500, {
            "Content-Type": "text/plain"
          });
          res.write(err + "\n");
          res.end();
          return;
        }

        res.writeHead(200, {
          "Content-Type": _mime.default.getType(path)
        });
        res.write(file, "binary");
        res.end();
      });
    }).catch(err => {
      res.writeHead(404, {
        "Content-Type": "text/plain"
      });
      res.write("404 Not Found\n");
      res.write(`ERROR: ${err}`);
      res.end();
      return;
    });
  });
};

const App = done => {
  const httpServer = createHttpServer();
  const wss = new _ws.default.Server({
    server: httpServer
  });
  wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
      console.log("received: %s", message);
    });
    ws.send("something");
  });

  const doneInternal = from => () => {
    if (typeof done === "function") {
      done(from, httpServer)();
    }
  };

  console.log("app.js", {
    "process.env.NODE_ENV": process.env.NODE_ENV,
    DEV: IS_DEV,
    TEST: IS_TEST
  });

  if (IS_DEV && !IS_TEST) {
    console.log("app.js", "STARTING APP!!");
    doneInternal("DEV")();
  } else {
    doneInternal("PROD")();
  }

  return httpServer;
};

var _default = App;
exports.default = _default;