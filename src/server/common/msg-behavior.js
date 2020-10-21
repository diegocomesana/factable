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
  jsonParse,
  getCaseString,
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
          const ioHash = getHash({
            a: callInfo.metadata.name,
            b: callInfo.args,
            c: callInfo.output,
          });

          // console.log("LALA:", callInfo.metadata.name, outputHash);

          const transformedArgs = callInfo.args.map(({ type, valueString }) => {
            // REPARSE STRINGIFIED FUNCTIONS
            return {
              type,
              valueString:
                type === "function" ? jsonParse(valueString) : valueString,
            };
          });

          const callInfoWithHash = {
            // hash,
            ioHash,
            inputHash,
            outputHash,
            caseString: getCaseString(
              callInfo.metadata.params,
              transformedArgs
            ),
            ...callInfo,
            metadata: {
              ...callInfo.metadata,
            },
            relativeFilePath: getRelativeFilePath(
              callInfo.metadata.root,
              callInfo.metadata.filename
            ),
            args: transformedArgs,
            output: callInfo.output
              ? {
                  type: callInfo.output.type,
                  valueString:
                    callInfo.output.type === "function"
                      ? jsonParse(callInfo.output.valueString)
                      : callInfo.output.valueString,
                }
              : {
                  type: "undefined",
                  valueString: "undefined",
                },
          };

          const inputInfo = {
            inputHash,
            caseString: getCaseString(
              callInfo.metadata.params,
              transformedArgs
            ),
            metadata: {
              ...callInfo.metadata,
            },
            relativeFilePath: getRelativeFilePath(
              callInfo.metadata.root,
              callInfo.metadata.filename
            ),
            args: transformedArgs,
          };

          // console.log("callInfoWithHash:", callInfoWithHash);

          hashtable.put(inputHash, inputInfo);
          hashtable.put(ioHash, callInfoWithHash);

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
          data.payload.inputHash
        ) {
          const inputInfo = hashtable.get(data.payload.inputHash);

          const currentState = store.getState();

          const outputsFromState =
            currentState.cases[inputInfo.relativeFilePath][
              inputInfo.metadata.name
            ].calls[inputInfo.inputHash].outputs;

          const outputs = Object.keys(outputsFromState).map((outputHash) => {
            const ioHash = outputsFromState[outputHash].ioHash;
            const { output } = hashtable.get(ioHash);
            return {
              ioHash,
              output,
            };
          });

          const caseInfo = {
            inputInfo,
            outputs,
          };

          // console.log("case INFO: ", caseInfo);

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
