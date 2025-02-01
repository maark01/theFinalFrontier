import { SpaceDevsAPI } from '../../gateway/space_devs/space_devs-api'
import { AddAstronautMixin } from './add-astronaut-mixin'
import { AstronautQuery } from './astronaut-query'
import { Astronaut, AstronautWithRelations } from './model'

export class AstronautService {

    constructor(
        private readonly spaceDevsAPI: SpaceDevsAPI,
        private readonly addAstronautMixin: AddAstronautMixin,
        private readonly astronautQuery: AstronautQuery
    ) { }

    getAstronautsFromAPI = async (): Promise<Astronaut[]> => {
        return this.spaceDevsAPI.getAstronauts()
            .then((response) => {
                const astronautsList = response.results.filter(e => e.agency !== null && e.image !== null).map(astronaut => ({
                    id: astronaut.id,
                    name: astronaut.name,
                    age: astronaut?.age || 0,
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
                }))

                astronautsList.forEach(astronaut => {
                    this.addAstronautMixin.insertAstronaut(astronaut.id, astronaut.name, astronaut.age, astronaut.bio, astronaut.inSpace, astronaut.status, astronaut.agency, astronaut.image)
                })
                return astronautsList
            })
            .catch(error => {
                console.error('Error fetching astronauts: ', error)
                throw new Error('Failed to fetch astronauts')
            })
    }

    getAstronauts = async (search?: string): Promise<AstronautWithRelations[]> => {
        return this.astronautQuery.getAstronauts(search)
            .then((astronaut: AstronautWithRelations[]) => {
                if (astronaut === undefined) {
                    throw new Error('Request refused, incorrect request! Please try again!')
                }
                return astronaut
            })
            .catch(error => error.message)
    }
}
