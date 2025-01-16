"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.astronautsRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../services/index");
exports.astronautsRouter = express_1.default.Router();
exports.astronautsRouter.get('/', async (req, res) => {
    index_1.astronautService.getAllAstronautsFromAPI()
        .then(astronauts => {
        res.status(200).send({ results: astronauts });
    })
        .catch(error => {
        res.status(500).send({ error: error.message });
    });
});
exports.astronautsRouter.get('/db', async (req, res) => {
    index_1.astronautService.getAllAstronauts()
        .then((astronaut) => {
        res.status(200).send(astronaut);
    })
        .catch(error => {
        res.status(500).send({ error: error.message });
    });
});
