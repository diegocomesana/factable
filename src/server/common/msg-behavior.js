import WebSocket from "ws";
import path from "path";
import { SocketMessageType } from "./types";

import {
  safeJsonStringify,
  parseJson,
  msgWrapper,
  getRelativeFilePath,
  getHash,
  jsonParse,
  getCaseString,
  prettyFormatString,
  getTestFileTestBlock,
  saveState,
  callInfoToTestInfo,
  getTestFileSrc,
  saveFile,
  resolvePathCWD,
  camelToDash,
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

          const relativeFilePath = getRelativeFilePath(
            callInfo.metadata.root,
            callInfo.metadata.filename
          );

          const inputHash = getHash({
            a: callInfo.metadata.name,
            b: callInfo.args,
          });
          const outputHash = getHash(callInfo.output);
          const ioHash = getHash({
            a: relativeFilePath,
            b: callInfo.metadata.name,
            c: callInfo.args,
            d: callInfo.output,
          });

          const transformedArgs = callInfo.args.map(({ type, valueString }) => {
            // REPARSE STRINGIFIED FUNCTIONS
            return {
              type,
              valueString:
                type === "function" ? jsonParse(valueString) : valueString,
            };
          });

          const caseString = getCaseString(
            callInfo.metadata.params,
            transformedArgs
          );

          const callInfoWithHash = {
            ioHash,
            inputHash,
            outputHash,
            caseString,
            ...callInfo,
            metadata: {
              ...callInfo.metadata,
            },
            relativeFilePath,
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
            const { ioHash, tested } = outputsFromState[outputHash];
            const { output } = hashtable.get(ioHash);
            return {
              ioHash,
              tested,
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

        if (
          data.type === SocketMessageType.ON_BUILD_TEST &&
          data.payload &&
          data.payload.ioHash
        ) {
          const callInfo = hashtable.get(data.payload.ioHash);
          const testInfo = callInfoToTestInfo(callInfo);
          const currentState = store.dispatch(actions.onSaveTest)(testInfo);

          // GET ALL THE TESTS THAT SHOULD GO IN THE SAME FILE: all the tests for this functionName
          const allTestsForFile =
            currentState.tests[testInfo.relativeFilePath][
              testInfo.functionName
            ];

          const srcStr = getTestFileSrc(
            testInfo.functionName,
            allTestsForFile,
            currentState.config
          );
          const { code, error } = prettyFormatString(srcStr);

          if (code) {
            saveFile(
              resolvePathCWD(`./${testInfo.testRelativePath}`),
              testInfo.testFileName,
              code
            )
              .then(() => saveState(currentState))
              .then(() => {
                // TO ALL CLIENTS:
                wss.clients.forEach(function each(client) {
                  if (client.readyState === WebSocket.OPEN) {
                    client.send(
                      safeJsonStringify(
                        msgWrapper(
                          SocketMessageType.ON_BUILD_TEST_CONFIRMED,
                          testInfo
                        )
                      )
                    );
                  }
                });
              });
          } else {
            console.log(error);
          }
        }
      },
    };
  };
};

export default msgFactory;
