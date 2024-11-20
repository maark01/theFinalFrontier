import { QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { Image} from './model'
import { db } from '../../db/model'

export interface ImageMutation {
    addImages(id: number, name: string, imageUrl: string): Promise<Image>
}

export class PgImageMutation extends SqlStore implements ImageMutation {
    addImages = async (id: number, name: string, imageUrl: string): Promise<Image> => {
        return this.execute('INSERT INTO public.image (id, name, image_url) VALUES ($1, $2, $3)', [id, name, imageUrl])
            .then((result: QueryResult<db.Image>) => {
                const row = result.rows[0]
                return {
                    id,
                    name,
                    imageUrl
                }
            })
    }
}
