const plugin = require("./build/plugin");
const server = require("./build/server");
const evidencer = require("./build/evidencer");

plugin.server = server;
plugin.evidencer = evidencer;

module.exports = plugin;
