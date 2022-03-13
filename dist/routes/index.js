"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var health_1 = __importDefault(require("./health"));
var forms_1 = __importDefault(require("./forms"));
var payment_1 = __importDefault(require("./payment"));
var animals_1 = __importDefault(require("./animals"));
var routes = (0, express_1.Router)();
routes.use(health_1.default);
routes.use(forms_1.default);
routes.use(payment_1.default);
routes.use(animals_1.default);
exports.default = routes;
