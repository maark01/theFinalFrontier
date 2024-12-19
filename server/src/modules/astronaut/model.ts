import { Agency } from '../agency/model'
import { Image } from '../image/model'
import { Status } from '../status/model'


export interface Astronaut {
    id: number
    name: string
    bio: string
}

export interface AstronautWithStatusAndImage {
    id: number
    name: string
    bio: string
    statusId: number | null
    statusName: string | null
    imageId: number | null
    imageName: string | null
    imageUrl: string | null
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