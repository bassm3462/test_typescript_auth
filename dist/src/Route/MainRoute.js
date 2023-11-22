"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserR_1 = __importDefault(require("./UserR"));
const route = (0, express_1.Router)();
exports.default = () => {
    (0, UserR_1.default)(route);
    return route;
};
