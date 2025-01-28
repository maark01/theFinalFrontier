import { ParamsDictionary } from 'express-serve-static-core'

export namespace API {

    export namespace Astronaut {
        
        export interface WithError {
            error: string
        }

        export interface WithMessage {
            message: string
        }

        export interface WithSearch {
            search: string | null
        }

        export interface WithId extends ParamsDictionary {
            astronautId: string
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
