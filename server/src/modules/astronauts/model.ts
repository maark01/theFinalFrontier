import { Agency } from "../agencies/model"

export interface Astronaut {
    id: number
    name: string
    status: string
    agency: Agency[]
}

export interface Results {
    results: Astronaut[]
}
