import { Agency } from '../agency/model'
import { Image } from '../image/model'
import { Status } from '../status/model'


export interface Astronaut {
    id: number
    name: string
    status?: Status
    agency?: Agency
    image?: Image
    bio: string
}

export interface Results {
    results: Astronaut[]
}
