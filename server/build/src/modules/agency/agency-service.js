"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyService = void 0;
class AgencyService {
    spaceDevsAPI;
    addAgencyMixin;
    agencyQuery;
    constructor(spaceDevsAPI, addAgencyMixin, agencyQuery) {
        this.spaceDevsAPI = spaceDevsAPI;
        this.addAgencyMixin = addAgencyMixin;
        this.agencyQuery = agencyQuery;
    }
    getAllAgenciesFromAPI = async () => {
        return this.spaceDevsAPI.getAllAgencies()
            .then((response) => {
            const angenciesList = response.results.map(agency => ({
                id: agency.id,
                name: agency.name,
                abbrev: agency.abbrev,
                foundingYear: agency.founding_year
            }));
            angenciesList.forEach(agency => {
                this.addAgencyMixin.insertAgency(agency.id, agency.name, agency.abbrev, agency.foundingYear);
            });
            return angenciesList;
        })
            .catch(error => {
            console.error('Error fetching agencies: ', error);
            throw new Error('Failed to fetch agencies');
        });
    };
    async getAllAgencies() {
        return this.agencyQuery.getAllAgencies()
            .then((agency) => {
            if (agency === undefined) {
                throw new Error('Request refused, incorrect request! Please try again!');
            }
            return agency;
        })
            .catch(error => error.message);
    }
}
exports.AgencyService = AgencyService;
