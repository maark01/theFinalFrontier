import { Astronaut } from "../../modules/astronauts/model"
import { AgenciesAPI } from "../agenciesapi/agencies-api"

export namespace AstronautsAPI {

    export interface Results {
        results: Astronaut[]
    }
}