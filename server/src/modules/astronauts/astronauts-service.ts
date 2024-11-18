import { AstronautsAPI } from '../../gateway/astronautsapi/astronauts-api'
import { AstronautsMutation } from './astronauts-mutation'
import { AstronautsQuery } from './astronauts-query'
import { Astronaut } from './model'

export class AstronautsService {

    constructor(
        private readonly astronautsAPI: AstronautsAPI,
        private readonly astronautsMutation: AstronautsMutation,
        private readonly astronautsQuery: AstronautsQuery
    ) { }

    getAllAstronautsFromAPI = async (): Promise<Astronaut[]> => {
        return this.astronautsAPI.getAllAstronauts()
            .then((response) => {
                const astronautsList = response.results
                astronautsList.map(astronaut => {
                    return this.astronautsMutation.insertAstronautsIntoDatabase(astronaut.id, astronaut.name, astronaut.status, astronaut.agency,
                        astronaut.image, astronaut.bio)
                })
                return astronautsList
            })
            .catch(error => {
                console.error('Error fetching astronauts:', error)
                throw new Error('Failed to fetch astronauts')
            })
    }

    getAllAstronautsFromDatabase = async (): Promise<Astronaut[]> => {
        return this.astronautsQuery.getAllAstronautsFromDatabase()
            .then((astronaut: Astronaut[]) => {
                if (astronaut === undefined) {
                    throw new Error('Request refused, incorrect request! Please try again!')
                }
                return astronaut
            })
            .catch(error => error.message)
    }
}
