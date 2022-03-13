"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var telegramConstants_1 = require("../constants/telegramConstants");
var services_1 = require("../services");
var Forms_1 = __importDefault(require("./Forms"));
var SITE_BASE_URL = process.env.SITE_BASE_URL;
var newAnimal = function (msg) {
    services_1.logger.info("[".concat(msg.chat.id, "][").concat(msg.text, "] Creating new animal"));
    var form = new Forms_1.default(telegramConstants_1.questions, telegramConstants_1.questions[0], msg, new URL(SITE_BASE_URL));
    form.sendNextQuestion();
    _1.chats[msg.chat.id] = form;
};
exports.default = newAnimal;
