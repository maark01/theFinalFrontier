"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstronautService = void 0;
class AstronautService {
    spaceDevsAPI;
    addAstronautMixin;
    astronautQuery;
    constructor(spaceDevsAPI, addAstronautMixin, astronautQuery) {
        this.spaceDevsAPI = spaceDevsAPI;
        this.addAstronautMixin = addAstronautMixin;
        this.astronautQuery = astronautQuery;
    }
    getAllAstronautsFromAPI = async () => {
        return this.spaceDevsAPI.getAllAstronauts()
            .then((response) => {
            const astronautsList = response.results.map(astronaut => ({
                id: astronaut.id,
                name: astronaut.name,
                age: astronaut.age,
                bio: astronaut.bio,
                inSpace: astronaut.in_space,
                status: {
                    id: astronaut.status.id,
                    name: astronaut.status.name
                },
                agency: {
                    id: astronaut.agency.id,
                    name: astronaut.agency.name,
                    abbrev: astronaut.agency.abbrev,
                    foundingYear: astronaut.agency.founding_year
                },
                image: {
                    id: astronaut.image.id,
                    name: astronaut.image.name,
                    imageUrl: astronaut.image.image_url
                }
            }));
            astronautsList.forEach(astronaut => {
                this.addAstronautMixin.insertAstronaut(astronaut.id, astronaut.name, astronaut.age, astronaut.bio, astronaut.inSpace, astronaut.status, astronaut.agency, astronaut.image);
            });
            return astronautsList;
        })
            .catch(error => {
            console.error('Error fetching astronauts: ', error);
            throw new Error('Failed to fetch astronauts');
        });
    };
    getAllAstronauts = async () => {
        return this.astronautQuery.getAllAstronauts()
            .then((astronaut) => {
            if (astronaut === undefined) {
                throw new Error('Request refused, incorrect request! Please try again!');
            }
            return astronaut;
        })
            .catch(error => error.message);
    };
}
exports.AstronautService = AstronautService;
