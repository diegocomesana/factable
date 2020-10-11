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
  console.log("msgFactory RECIBÍ WSS Y HASHTABLE", store.getState());
  return (ws) => {
    console.log("msgFactory RECIBÍ WS");
    return {
      onConnection: () => {
        console.log("SE CONECTÓ UN CHANGO!!");
        ws.send(safeJsonStringify(msgWrapper("init", store.getState())));
      },
      onMessage: (msg) => {
        const data = parseJson(msg);
        // console.log("onMessage: ", data);

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
