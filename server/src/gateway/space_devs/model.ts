export namespace SpaceDevsAPI {

    export interface AstronautResults {
        results: Astronaut[]
    }
  
    export interface AgencyResults {
        results: Agency[]
    }

    export interface LaunchesResults {
        results: Launch []
    }

    export interface Astronaut {
        id: number
        name: string
        age: number
        bio: string
        in_space: boolean
        status: Status
        agency: Agency
        image: Image
    }

    export interface Status {
        id: number
        name: string
    }

    export interface Agency {
        id: number 
        name: string
        abbrev: string
        founding_year: number
    }

    export interface Image {
        id: number
        name: string
        image_url: string
    }

    export interface Mission {
        id: number
        name: string
        type: string
        description: string
    }

    export interface Launch {
        id: string
        name: string
        net: string
        status: Status
        image: Image
        mission: Mission
    }
}