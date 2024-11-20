import { SpaceDevsAPI } from '../../gateway/space_devs/space_devs-api'
import { AstronautMutation } from './astronaut-mutation'
import { ImageMutation } from '../image/image-mutation'
import { StatusMutation } from '../status/status-mutation'
import { AstronautQuery } from './astronaut-query'
import { Astronaut } from './model'

export class AstronautService {

    constructor(
        private readonly spaceDevsAPI: SpaceDevsAPI,
        private readonly astronautMutation: AstronautMutation,
        private readonly astronautQuery: AstronautQuery,
        private readonly imageMutation: ImageMutation,
        private readonly statusMutation: StatusMutation
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
                    this.astronautMutation.addAstronauts(astronaut.id, astronaut.name, astronaut.bio)
                    this.imageMutation.addImages(astronaut.image.id, astronaut.image.name, astronaut.image.imageUrl)
                    this.statusMutation.addStatus(astronaut.status.id, astronaut.status.name)
                })
                return astronautsList

            })
            .catch(error => {
                console.error('Error fetching astronauts: ', error)
                throw new Error('Failed to fetch astronauts')
            })
    }

    getAllAstronauts = async (): Promise<Astronaut[]> => {
        return this.astronautQuery.getAllAstronauts()
            .then((astronaut: Astronaut[]) => {
                if (astronaut === undefined) {
                    throw new Error('Request refused, incorrect request! Please try again!')
                }
                return astronaut
            })
            .catch(error => error.message)
    }
}
