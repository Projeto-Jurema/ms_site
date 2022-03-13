"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = __importDefault(require("../config/bot"));
var telegramConstants_1 = require("../constants/telegramConstants");
var services_1 = require("../services");
var HENRIQUE_CHAT_ID = process.env.HENRIQUE_CHAT_ID;
var start = function (msg) {
    services_1.logger.info("[".concat(msg.chat.id, "] Starting bot"));
    if (msg.chat.id === parseFloat(HENRIQUE_CHAT_ID)) {
        bot_1.default.sendMessage(msg.chat.id, telegramConstants_1.texts.helloHenrique);
    }
    bot_1.default.sendMessage(msg.chat.id, telegramConstants_1.texts.helloCreators(msg.chat.first_name));
};
exports.default = start;
