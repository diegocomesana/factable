import http from "http";
import url from "url";
import path from "path";
import fs from "fs";
import mime from "mime";
import WebSocket from "ws";
import SimpleHashTable from "simple-hashtable";
import { RunMode } from "./common/types";
import { buildHtml } from "./common/html";
import {
  prettyJson,
  safeJsonStringify,
  camelToDash,
  parseJson,
  msgWrapper,
} from "../common/utils";
// import { format } from "prettier";

const hashtable = new SimpleHashTable();

const pageTitle = "Factable Admin";
const IS_DEV = process.env.NODE_ENV !== RunMode.PROD;
const IS_TEST = process.env.NODE_ENV === RunMode.TEST;

const resolvePath = (p) => path.resolve(__dirname, p);

const fileExists = (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) {
        resolve({ exists: false, path, isDir: false });
        return;
      }
      const isDir = fs.statSync(path).isDirectory();
      resolve({ exists: true, path, isDir });
    });
  });
};

const onMessage = (wss, ws, msg) => {
  const data = parseJson(msg);
  console.log("onMessage: ", data);

  if (
    data &&
    data.type &&
    data.type === "registerFunctionCall" &&
    data.payload &&
    data.payload.paramsHash
  ) {
    hashtable.put(data.payload.paramsHash, data.payload);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          safeJsonStringify(msgWrapper("registerFunctionCall", data.payload))
        );
      }
    });
  }
};

const createHttpServer = () => {
  return http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    const pathPrefix = IS_DEV ? "../build/" : "";
    const filePath = resolvePath(`../${pathPrefix}client/${uri}`); // BABEL NODE VS NODE TOMAN DISTINTO PATH

    // console.log("NEW REQUEST: ");
    // console.log("uri: ", uri);
    // console.log("filename: ", filePath);

    if (uri === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        buildHtml({ title: pageTitle, bundles: ["vendors.js", "main.js"] })
      );
      res.end();
      return;
    }

    fileExists(filePath)
      .then(({ exists, path, isDir }) => {
        if (!exists) {
          throw new Error("NOT FOUND!!");
        }
        if (isDir) {
          return fileExists(`${path}/index.html`);
        }
        return { exists, path, isDir };
      })
      .then(({ exists, path, isDir }) => {
        if (!exists) {
          throw new Error("NOT FOUND!!");
        }
        return { exists, path, isDir };
      })
      .then(({ exists, path, isDir }) => {
        fs.readFile(path, "binary", (err, file) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.write(err + "\n");
            res.end();
            return;
          }
          res.writeHead(200, { "Content-Type": mime.getType(path) });
          res.write(file, "binary");
          res.end();
        });
      })
      .catch((err) => {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("404 Not Found\n");
        res.write(`ERROR: ${err}`);
        res.end();
        return;
      });
  });
};

const App = (done) => {
  const httpServer = createHttpServer();
  const wss = new WebSocket.Server({ server: httpServer });

  wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      // console.log("received: %s", msg);
      onMessage(wss, ws, msg);
    });

    ws.send("hellooooo from server!!");
  });

  const doneInternal = (from) => () => {
    if (typeof done === "function") {
      done(from, httpServer)();
    }
  };

  console.log("app.js", {
    "process.env.NODE_ENV": process.env.NODE_ENV,
    DEV: IS_DEV,
    TEST: IS_TEST,
  });

  if (IS_DEV && !IS_TEST) {
    console.log("app.js", "STARTING APP!!");
    doneInternal("DEV")();
  } else {
    doneInternal("PROD")();
  }

  return httpServer;
};

export default App;
