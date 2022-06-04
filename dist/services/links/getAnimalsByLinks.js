"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimalsByLinks = void 0;
var getAnimalsByLinks = function (animals) {
    if (!animals.length)
        return [];
    // @ts-ignore
    return animals.map(function (animal) { return JSON.parse(animal.metadata); });
};
exports.getAnimalsByLinks = getAnimalsByLinks;
