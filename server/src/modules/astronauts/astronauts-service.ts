import { AstronautsAPI } from '../../gateway/astronautsapi/astronauts-api'
import { Astronaut, Results } from './model'

export class AstronautsService {

    constructor(private astronautsAPI: AstronautsAPI) { }

    getAllAstronauts(): Promise<Astronaut[]> {
        return this.astronautsAPI.getAllAstronauts()
            .then(response => {
                const astroList = response.results
                astroList.map((astro: Astronaut) => {
                    console.log({ id: astro.id, name: astro.name, status: astro.status, agency: astro.agency })
                })
                return astroList
            })
            .catch(error => {
                console.error('Error fetching astronauts:', error)
                throw new Error('Failed to fetch astronauts')
            })
    }
}
