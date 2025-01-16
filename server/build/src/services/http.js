"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosHttpService = void 0;
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
class AxiosHttpService {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    request(config) {
        const headers = {
            ...config.headers,
            'Conent-Type': 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}`
        };
        return (0, axios_1.default)({
            url: `${this.baseUrl}${config.path}`,
            data: config.body,
            headers: headers,
            method: config.method,
            responseType: config.responseType ?? 'json'
        }).then(response => {
            if (response.status < 300) {
                return response.data;
            }
            throw new Error(response.data);
        }).catch((error) => {
            console.log(`fetch-error: ${this.baseUrl}${config.path}`);
            console.log(config);
            throw Error(error);
        });
    }
}
exports.AxiosHttpService = AxiosHttpService;
