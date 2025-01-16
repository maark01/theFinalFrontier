"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agenciesRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../services/index");
exports.agenciesRouter = express_1.default.Router();
exports.agenciesRouter.get('/', async (req, res) => {
    index_1.agencyService.getAllAgenciesFromAPI()
        .then(agency => {
        res.status(200).send({ results: agency });
    })
        .catch(error => {
        if (error)
            res.status(500).send({ error: error.message });
    });
});
exports.agenciesRouter.get('/db', async (req, res) => {
    index_1.agencyService.getAllAgencies()
        .then((agency) => {
        res.status(200).send(agency);
    })
        .catch(error => {
        if (error)
            res.status(500).send({ error: error.message });
    });
});
