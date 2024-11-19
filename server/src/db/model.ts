export namespace db {

    export interface Astronaut {
        id: string
        name: string
        bio: string
    }

    export interface Status {
        id: string
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

