export namespace pg {

    export interface Astronaut {
        id: string
        name: string
        age: string
        bio: string
        in_space: boolean
    }

    export interface Status {
        status_id: string
        status_name: string
    }

    export interface Agency {
        id: string
        name: string
        abbrev: string
        founding_year: string
    }

    export interface Image {
        image_id: string
        image_name: string
        image_url: string
    }

    export interface AstronautWithStatusAgencyImage {
        id: string
        name: string
        age: string
        bio: string
        in_space: boolean
        status_id: string
        status_name: string
        agency_id: string
        agency_name: string
        abbrev: string
        founding_year: string
        image_id: string
        image_name: string
        image_url: string
    }

    export interface AstronautStatus {
        astronaut_id: string
        status_id: string
    }

    export interface AstronautAgency {
        astronaut_id: string
        agency_id: string
    }

    export interface AstronautImage {
        astronaut_id: string
        image_id: string
    }
}