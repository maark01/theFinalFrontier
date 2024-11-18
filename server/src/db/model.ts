import { Status } from '../modules/status/model'
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
}