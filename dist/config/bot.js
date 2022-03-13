"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NTBA_FIX_319 = '1';
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
var bot = new node_telegram_bot_api_1.default(TELEGRAM_BOT_TOKEN, {
    polling: true,
});
exports.default = bot;
