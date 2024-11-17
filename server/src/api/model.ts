import { ParamsDictionary } from 'express-serve-static-core'
import { Astronaut } from '../modules/astronauts/model'

export namespace API {

    export namespace Astronaut {
        
        export interface WithError {
            error: string
        }

        export interface WithMessage {
            message: string
        }

        export interface WithId extends ParamsDictionary {
            astronautId: string
        }

        export interface Results {
            results: Astronaut[]
        }
    }

    export namespace Agency {

        export interface WithError {
            error: string
        }

        export interface WithMessage {
            message: string
        }

        export interface WithId extends ParamsDictionary {
            agencyId: string
        }
    }
}
