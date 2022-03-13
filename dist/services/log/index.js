"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    error: function (data) { return console.error(data); },
    info: function (data) { return console.log(data); },
    warn: function (data) { return console.warn(data); },
    beautify: function (data) { return JSON.stringify(data, null, 2); },
};
