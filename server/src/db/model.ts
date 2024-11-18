import { Agency } from "../modules/agencies/model"
import { Image } from "../modules/images/model"

export namespace db {

    export interface Astronaut {
        id: string
        name: string
        status: Status 
        agency: Agency
        image: Image
        bio: string
    }

    export interface Status {
        id: string
        name: string
    }
}