import WebSocket from "ws";
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

          /*
          console.log("callInfo:", callInfo);

          const inputData = buildInputData(
            callInfo.metadata.params,
            callInfo.args
          );

          // console.log("inputData:", inputData);

          const inputConstDeclarations = inputData
            .map(({ name, value }) => `const ${name} = ${value};`)
            .join("\n");

          const functionCallDeclaration = `const output = ${
            callInfo.metadata.name
          }${callInfo.metadata.params
            .map((call) => `(${call.join(", ")})`)
            .join("")};`;

          const expectedOutputDeclaration = `const expectedOutput = ${callInfo.output.valueString};`;

          const fileTemplate = `
            import { ${
              callInfo.metadata.name
            } } from '../${getFilenameForImportFromPath(
            callInfo.relativeFilePath
          )}';
          
          describe("${callInfo.metadata.name}", () => {

            test("it should not transform", async (done) => {
              ${inputConstDeclarations}
              ${expectedOutputDeclaration}
              ${functionCallDeclaration}
              expect(output).toEqual(expectedOutput);
              done();
            });

          });
          `;
          */

          const currentState = store.dispatch(actions.onSaveTest)(callInfo);

          console.log("store: ", currentState);

          saveState(currentState);

          const srcStr = getTestFileTestBlock(callInfo);

          const { code, error } = prettyFormatString(srcStr);

          if (code) {
            console.log(code);
          } else {
            console.log(error);
          }

          // if (ws.readyState === WebSocket.OPEN) {
          //   ws.send(
          //     safeJsonStringify(
          //       msgWrapper(SocketMessageType.CASE_VIEW, caseInfo)
          //     )
          //   );
          // }
        }
      },
    };
  };
};

export default msgFactory;
