"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var payment_1 = require("../../controllers/payment");
var routes = (0, express_1.Router)();
routes.post('/pix', payment_1.Post);
exports.default = routes;
