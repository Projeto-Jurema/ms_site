"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../../controllers");
var routes = (0, express_1.Router)();
routes.get('/animals', controllers_1.Get);
exports.default = routes;
