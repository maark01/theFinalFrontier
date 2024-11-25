import { Agency } from '../agency/model'
import { Image } from '../image/model'
import { Status } from '../status/model'


export interface Astronaut {
    id: number
    name: string
    bio: string
}

export interface AstronautWithStatusAndImage extends Astronaut {
    status: Status
    image: Image
}

export interface AstronautStatus {
    astronautId: number
    statusId: number
}

export interface AstronautImages {
    astronautId: number
    imageId: number
}

export interface Results {
    results: Astronaut[]
}
