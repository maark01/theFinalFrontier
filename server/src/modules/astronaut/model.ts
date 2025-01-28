export interface Astronaut {
    id: number
    name: string
    age: number
    bio: string
    inSpace: boolean
}

export interface AstronautWithStatusAgencyImage {
    id: number
    name: string
    age: number
    bio: string
    inSpace: boolean
    statusId: number | null
    statusName: string | null
    agencyId: number | null
    agencyName: string | null
    abbrev: string | null
    foundingYear: number | null
    imageId: number | null
    imageName: string | null
    imageUrl: string | null
}

export interface AstronautStatus {
    astronautId: number
    statusId: number
}

export interface AstronautAgency {
    astronautId: number
    agencyId: number
}

export interface AstronautImage {
    astronautId: number
    imageId: number
}

export interface Results {
    results: Astronaut[]
}