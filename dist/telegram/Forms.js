"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var bitly_1 = __importDefault(require("../config/bitly"));
var bot_1 = __importDefault(require("../config/bot"));
var prisma_1 = __importDefault(require("../config/prisma"));
var telegramConstants_1 = require("../constants/telegramConstants");
var upload_1 = __importDefault(require("./upload"));
var Forms = /** @class */ (function () {
    function Forms(questions, currentQuestion, msg, link) {
        this.questions = questions;
        this.currentQuestion = currentQuestion;
        this.msg = msg;
        this.link = link;
    }
    Forms.prototype.saveInDb = function (_a) {
        var animalLink = _a.animalLink;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, prisma_1.default.animals.create({ data: { animalLink: animalLink } })];
            });
        });
    };
    Forms.prototype.sendNextQuestion = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var animalInstance, shortenUrl, options, opts;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!((_a = this.currentQuestion) === null || _a === void 0 ? void 0 : _a.text)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.saveInDb({
                                animalLink: encodeURI(this.link.toString()),
                            })];
                    case 1:
                        animalInstance = _c.sent();
                        return [4 /*yield*/, bitly_1.default.shorten(this.link.toString())];
                    case 2:
                        shortenUrl = _c.sent();
                        bot_1.default.sendMessage(this.msg.chat.id, telegramConstants_1.texts.result(shortenUrl.link, animalInstance.id));
                        return [2 /*return*/, delete _1.chats[this.msg.chat.id]];
                    case 3:
                        options = (_b = this.currentQuestion.allowedAnswers) === null || _b === void 0 ? void 0 : _b.map(function (option) { return ({
                            text: option[0].toUpperCase() + option.substring(1),
                        }); }).filter(function (option) { return option.text !== '*'; });
                        opts = {
                            reply_markup: {
                                keyboard: [options || []],
                                one_time_keyboard: true,
                                force_reply: true,
                                resize_keyboard: true,
                            },
                        };
                        bot_1.default.sendMessage(this.msg.chat.id, this.currentQuestion.text, opts);
                        return [2 /*return*/];
                }
            });
        });
    };
    Forms.prototype.jumpToNextQuestion = function () {
        this.currentQuestion = this.questions[this.currentQuestion.id + 1];
        this.sendNextQuestion();
    };
    Forms.prototype.saveAsImage = function (msg) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = msg.photo) === null || _a === void 0 ? void 0 : _a.length)) {
                            return [2 /*return*/, bot_1.default.sendMessage(this.msg.chat.id, telegramConstants_1.texts.invalid)];
                        }
                        return [4 /*yield*/, (0, upload_1.default)(msg)];
                    case 1:
                        url = _b.sent();
                        this.link.searchParams.append(this.currentQuestion.query, url);
                        this.jumpToNextQuestion();
                        return [2 /*return*/];
                }
            });
        });
    };
    Forms.prototype.saveAsText = function (msg) {
        if (!msg.text)
            return bot_1.default.sendMessage(this.msg.chat.id, telegramConstants_1.texts.invalid);
        this.link.searchParams.append(this.currentQuestion.query, msg.text);
        this.jumpToNextQuestion();
    };
    Forms.prototype.saveAnswer = function (msg) {
        var _a, _b, _c;
        var lowerCaseMessage = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        var isAllowAll = (_b = this.currentQuestion.allowedAnswers) === null || _b === void 0 ? void 0 : _b.includes('*');
        if (lowerCaseMessage &&
            !isAllowAll &&
            !((_c = this.currentQuestion.allowedAnswers) === null || _c === void 0 ? void 0 : _c.includes(lowerCaseMessage))) {
            return bot_1.default.sendMessage(this.msg.chat.id, telegramConstants_1.texts.invalid);
        }
        if (this.currentQuestion.type === 'text')
            return this.saveAsText(msg);
        if (this.currentQuestion.type === 'photo')
            return this.saveAsImage(msg);
    };
    return Forms;
}());
exports.default = Forms;
