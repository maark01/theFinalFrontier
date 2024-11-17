"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_api_1 = __importDefault(require("./src/api/express-api"));
const services_1 = require("./src/services");
require('dotenv').config();
const port = process.env.PORT;
(0, services_1.createServices)();
express_api_1.default.listen(port, () => console.log(`Example app listening on port ${port}!`));
