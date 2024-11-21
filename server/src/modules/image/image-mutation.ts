import { PoolClient, QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { Image } from './model'
import { db } from '../../db/model'

export interface ImageMutation {
    addAstronautImage(id: number, name: string, imageUrl: string): Promise<Image>
}

export class SqlImageMutation extends SqlStore implements ImageMutation {
    addAstronautImage = async (id: number, name: string, imageUrl: string): Promise<Image> => {
        return this.inTx<Image>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, image: Image) => void) => {
            this.addAstronautImageInTx(id, name, imageUrl, pool, check, (image: Image) => {
                onDone(null, image)
            })
        })
    }

    protected addAstronautImageInTx(id: number, name: string, imageUrl: string, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (image: Image) => void): void {
        pool.query(`INSERT INTO public.image (id, name, image_url) VALUES ($1, $2, $3)`,
            [id, name, imageUrl],
            (error: Error | null, result: QueryResult<db.Astronaut>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ id, name, imageUrl })
            }
        )
    }
}
