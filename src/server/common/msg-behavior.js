import WebSocket from "ws";
import { SocketMessageType } from "./types";

import {
  prettyJson,
  safeJsonStringify,
  camelToDash,
  parseJson,
  msgWrapper,
  getCallUniqueId,
  getRelativeFilePath,
  getHash,
} from "./utils";

import actions from "../store/actions";

const msgFactory = (wss, hashtable, store) => {
  return (ws) => {
    return {
      onConnection: () => {
        ws.send(
          safeJsonStringify(
            msgWrapper(SocketMessageType.INIT, store.getState())
          )
        );
      },
      onMessage: (msg) => {
        const data = parseJson(msg);

        // console.log("onMessage: ", msg, data);

        if (!(data && data.type)) {
          return;
        }

        if (
          data.type === SocketMessageType.REGISTER_FUNCTION_CALL &&
          data.payload &&
          data.payload.millis
        ) {
          const { payload: callInfo } = data;

          const hash = getCallUniqueId(
            callInfo.metadata.name,
            callInfo.args,
            callInfo.millis
          );

          const inputHash = getHash(callInfo.args);
          const outputHash = getHash(callInfo.output);

          const callInfoWithHash = {
            hash,
            inputHash,
            outputHash,
            ...callInfo,
            metadata: {
              ...callInfo.metadata,
            },
            relativeFilePath: getRelativeFilePath(
              callInfo.metadata.root,
              callInfo.metadata.filename
            ),
          };

          // console.log("callInfoWithHash:", callInfoWithHash);

          hashtable.put(hash, callInfoWithHash);

          store.dispatch(actions.onRegisterFunctionCall)(callInfoWithHash);

          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(
                safeJsonStringify(msgWrapper(data.type, callInfoWithHash))
              );
            }
          });
        }

        if (
          data.type === SocketMessageType.ON_CASE_CLICKED &&
          data.payload &&
          data.payload.hash
        ) {
          const caseInfo = hashtable.get(data.payload.hash);

          console.log("case INFO: ", caseInfo);

          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              safeJsonStringify(
                msgWrapper(SocketMessageType.CASE_VIEW, caseInfo)
              )
            );
          }
        }
      },
    };
  };
};

export default msgFactory;
