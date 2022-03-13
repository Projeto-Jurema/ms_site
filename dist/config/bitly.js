"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitly_1 = require("bitly");
var BITLY_TOKEN = process.env.BITLY_TOKEN;
var bitly = new bitly_1.BitlyClient(BITLY_TOKEN);
exports.default = bitly;
