import { SpaceDevsAPI } from '../../gateway/space_devs/space_devs-api'
import { AddAstronautMixin } from './add-astronaut-mixin'
import { AstronautQuery } from './astronaut-query'
import { Astronaut, AstronautWithStatusAndImage } from './model'

export class AstronautService {

    constructor(
        private readonly spaceDevsAPI: SpaceDevsAPI,
        private readonly addAstronautMixin: AddAstronautMixin,
        private readonly astronautQuery: AstronautQuery

    ) { }

    getAllAstronautsFromAPI = async (): Promise<Astronaut[]> => {
        return this.spaceDevsAPI.getAllAstronauts()
            .then((response) => {
                const astronautsList = response.results.map(astronaut => ({
                    id: astronaut.id,
                    name: astronaut.name,
                    status: astronaut.status,
                    agency: astronaut.agency,
                    bio: astronaut.bio,
                    image: {
                        id: astronaut.image.id,
                        name: astronaut.image.name,
                        imageUrl: astronaut.image.image_url
                    }
                }))

                astronautsList.forEach(astronaut => {
                    this.addAstronautMixin.insertAstronaut(astronaut.id, astronaut.name, astronaut.bio, astronaut.image, astronaut.status)
                })
                return astronautsList
            })
            .catch(error => {
                console.error('Error fetching astronauts: ', error)
                throw new Error('Failed to fetch astronauts')
            })
    }

    getAllAstronauts = async (): Promise<AstronautWithStatusAndImage[]> => {
        return this.astronautQuery.getAllAstronauts()
            .then((astronauts: AstronautWithStatusAndImage[]) => {
                if (astronauts === undefined) {
                    throw new Error('Request refused, incorrect request! Please try again!')
                }
                return astronauts
            })
            .catch(error => error.message)
    }
}
