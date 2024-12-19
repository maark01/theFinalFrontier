export namespace pg {

    export interface Astronaut {
        id: string
        name: string
        bio: string
    }

    export interface AstronautWithStatusAndImage {
        id: string
        name: string
        bio: string
        status_id: string
        status_name: string
        image_id: string
        image_name: string
        image_url: string
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
        status_id: string
        status_name: string
    }

    export interface Agency {
        id: string
        name: string
    }

    export interface Image {
        image_id: string
        image_name: string
        image_url: string
    }
}
