"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpSpaceDevsAPI = void 0;
class HttpSpaceDevsAPI {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getAllAstronauts() {
        const promises = [];
        for (let i = 0; i <= 700; i += 100) {
            promises.push(this.httpService.request({
                method: 'GET',
                path: `/astronauts/?limit=100&offset=${i}`
            }));
        }
        const results = await Promise.all(promises);
        const combinedResults = {
            results: results.flatMap(astronaut => astronaut.results)
        };
        return combinedResults;
    }
    async getAllAgencies() {
        const promises = [];
        for (let j = 0; j <= 300; j += 100) {
            promises.push(this.httpService.request({
                method: 'GET',
                path: `/agencies/?limit=100&offset=${j}`
            }));
        }
        const results = await Promise.all(promises);
        const combinedResults = {
            results: results.flatMap(agency => agency.results)
        };
        return combinedResults;
    }
}
exports.HttpSpaceDevsAPI = HttpSpaceDevsAPI;
