#!/usr/bin/env node

import run from ".";
const cliArgs = process.argv.slice(2);
const port = cliArgs[0];
run(port);
