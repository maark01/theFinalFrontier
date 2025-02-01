export namespace pg {

    export interface Astronaut {
        id: string
        name: string
        age: string
        bio: string
        in_space: boolean
    }

    export interface Agency {
        id: string
        name: string
        abbrev: string
        founding_year: string
    }

    export interface Launch {
        id: string
        name: string
        net: string
    }

    export interface Status {
        status_id: string
        status_name: string
    }

    export interface Image {
        image_id: string
        image_name: string
        image_url: string
    }

    export interface AstronautWithRelations {
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

    export interface LaunchWithRelations {
        id: string
        name: string
        net: string
        launch_status_id: string
        launch_status_name: string
        mission_id: string
        mission_name: string
        mission_type: string
        description: string
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

    export interface LaunchesStatus {
        launch_id: string
        status_id: string
    }
}