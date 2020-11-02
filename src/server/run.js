#!/usr/bin/env node

import "core-js/stable";
import "regenerator-runtime/runtime";

import run from ".";
const cliArgs = process.argv.slice(2);
const port = cliArgs[0];
run(port);
