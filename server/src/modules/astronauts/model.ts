import { Status } from '../status/model'
import { Agency } from '../agencies/model'
import { Image } from '../images/model'

export interface Astronaut {
    id: number
    name: string
    status: Status
    agency: Agency
    image: Image
    bio: string
}

export interface Results {
    results: Astronaut[]
}
