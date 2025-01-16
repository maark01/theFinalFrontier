"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlImageMutation = void 0;
const sql_store_1 = require("../../db/sql-store");
class SqlImageMutation extends sql_store_1.SqlStore {
    addAstronautImage = async (id, name, imageUrl) => {
        return this.inTx((pool, check, onDone) => {
            this.addAstronautImageInTx(id, name, imageUrl, pool, check, (image) => {
                onDone(null, image);
            });
        });
    };
    addAstronautImageInTx(id, name, imageUrl, pool, check, onDone) {
        pool.query(`INSERT INTO public.image (id, name, image_url) VALUES ($1, $2, $3)
             ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, image_url= EXCLUDED.image_url`, [id, name, imageUrl], (error, result) => {
            if (check(error)) {
                return;
            }
            const row = result.rows[0];
            onDone({ id, name, imageUrl });
        });
    }
}
exports.SqlImageMutation = SqlImageMutation;
