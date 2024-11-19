import { Agency } from '../agencies/model'


export interface Astronaut {
    id: number
    name: string
    status?: Status
    agency?: Agency
    image?: Image
    bio: string
}

export interface Status {
    id: number
    name: string
}

export interface Image {
    id: number
    name: string
    imageUrl: string
}

export interface Results {
    results: Astronaut[]
}
