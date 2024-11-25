import { Agency } from '../agency/model'
import { Image } from '../image/model'
import { Status } from '../status/model'


export interface Astronaut {
    id: number
    name: string
    bio: string
}

export interface AstronautWithStatusAndImage{
    id: number
    name: string
    bio: string
    statusId: number
    statusName: string
    imageId: number
    imageName: string
    imageUrl: string
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
