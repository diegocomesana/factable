import WebSocket from "ws";

import {
  prettyJson,
  safeJsonStringify,
  camelToDash,
  parseJson,
  msgWrapper,
  getCallUniqueId,
} from "./utils";

const msgFactory = (wss, hashtable, store) => {
  return (ws) => {
    return {
      onConnection: () => {
        ws.send(safeJsonStringify(msgWrapper("init", store.getState())));
      },
      onMessage: (msg) => {
        const data = parseJson(msg);

        if (
          data &&
          data.type &&
          data.type === "registerFunctionCall" &&
          data.payload &&
          data.payload.millis
        ) {
          const { payload: callInfo } = data;

          const hash = getCallUniqueId(
            callInfo.metadata.name,
            callInfo.args,
            callInfo.millis
          );

          const callInfoWithHash = { hash, ...callInfo };

          console.log("callInfoWithHash:", callInfoWithHash);

          hashtable.put(hash, callInfoWithHash);

          store.onMessage(callInfoWithHash);

          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(
                safeJsonStringify(
                  msgWrapper("registerFunctionCall", callInfoWithHash)
                )
              );
            }
          });
        }
      },
    };
  };
};

export default msgFactory;
