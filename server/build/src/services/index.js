"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServices = exports.agencyService = exports.astronautService = void 0;
exports.applyMixins = applyMixins;
const astronaut_service_1 = require("../modules/astronaut/astronaut-service");
const agency_service_1 = require("../modules/agency/agency-service");
const space_devs_api_1 = require("../gateway/space_devs/space_devs-api");
const http_1 = require("./http");
const add_astronaut_mixin_1 = require("../modules/astronaut/add-astronaut-mixin");
const astronaut_mutation_1 = require("../modules/astronaut/astronaut-mutation");
const astronaut_query_1 = require("../modules/astronaut/astronaut-query");
const status_mutation_1 = require("../modules/status/status-mutation");
const add_agency_mixin_1 = require("../modules/agency/add-agency-mixin");
const agency_mutation_1 = require("../modules/agency/agency-mutation");
const agency_query_1 = require("../modules/agency/agency-query");
const entity_parser_1 = require("../db/entity-parser/entity-parser");
const image_mutation_1 = require("../modules/image/image-mutation");
const db_config_1 = __importDefault(require("../db/db-config"));
require('dotenv').config();
const createServices = () => {
    const baseUrl = process.env.BASE_URL;
    applyMixins(add_astronaut_mixin_1.SqlAddAstronautMixin, [astronaut_mutation_1.SqlAstronautMutation, status_mutation_1.SqlStatusMutation, image_mutation_1.SqlImageMutation]);
    applyMixins(add_agency_mixin_1.SqlAddAgencyMixin, [agency_mutation_1.SqlAgencyMutation]);
    const SpaceDevsAPIHttp = new http_1.AxiosHttpService(baseUrl);
    const spaceDevsAPI = new space_devs_api_1.HttpSpaceDevsAPI(SpaceDevsAPIHttp);
    const addAstronautMixin = new add_astronaut_mixin_1.SqlAddAstronautMixin(db_config_1.default);
    const astronautMutation = new astronaut_mutation_1.SqlAstronautMutation(db_config_1.default);
    const astronautParser = new entity_parser_1.AstronautParser();
    const astronautQuery = new astronaut_query_1.SqlAstronautQuery(db_config_1.default, astronautParser);
    const statusMutation = new status_mutation_1.SqlStatusMutation(db_config_1.default);
    const addAgencyMixin = new add_agency_mixin_1.SqlAddAgencyMixin(db_config_1.default);
    const agencyMutation = new agency_mutation_1.SqlAgencyMutation(db_config_1.default);
    const agencyParser = new entity_parser_1.AgencyParser();
    const agencyQuery = new agency_query_1.SqlAgencyQuery(db_config_1.default, agencyParser);
    const imageMutation = new image_mutation_1.SqlImageMutation(db_config_1.default);
    exports.astronautService = new astronaut_service_1.AstronautService(spaceDevsAPI, addAstronautMixin, astronautQuery);
    exports.agencyService = new agency_service_1.AgencyService(spaceDevsAPI, addAgencyMixin, agencyQuery);
};
exports.createServices = createServices;
function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
        });
    });
}
