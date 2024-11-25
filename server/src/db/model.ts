export namespace db {

    export interface Astronaut {
        id: string
        name: string
        bio: string
    }

    export interface AstronautWithStatusAndImage {
        id: string
        name: string
        bio: string
        status: { id: string, name: string }
        image: { id: string, name: string, imageUrl: string }
    }

    export interface AstronautStatus {
        astronaut_id: string
        status_id: string
    }

    export interface AstronautImages {
        astronaut_id: string
        image_id: string
    }

    export interface Status {
        name: string
    }

    export interface Agency {
        id: string
        name: string
    }

    export interface Image {
        id: string
        name: string
        image_url: string
    }
}

