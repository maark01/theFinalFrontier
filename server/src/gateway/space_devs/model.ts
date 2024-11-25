export namespace SpaceDevsAPI {

    export interface Results {
        results: Astronaut[]
    }

    export interface Astronaut {
        id: number
        name: string
        bio: string
        status: Status
        image: Image
        agency: Agency
    }

    export interface Status {
        id: number
        name: string
    }

    export interface Agency {
        id: number
        name: string
    }

    export interface Image {
        id: number
        name: string
        image_url: string
    }
}