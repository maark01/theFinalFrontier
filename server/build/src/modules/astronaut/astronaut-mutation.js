"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAstronautMutation = void 0;
const sql_store_1 = require("../../db/sql-store");
class SqlAstronautMutation extends sql_store_1.SqlStore {
    addAstronaut = (id, name, age, bio, inSpace) => {
        return this.inTx((pool, check, onDone) => {
            this.addAstronautInTx(id, name, age, bio, inSpace, pool, check, (astronaut) => {
                onDone(null, astronaut);
            });
        });
    };
    addAstronautInTx(id, name, age, bio, inSpace, pool, check, onDone) {
        pool.query('INSERT INTO public.astronaut (id, name, age, bio, in_space) VALUES ($1, $2, $3, $4, $5)', [id, name, age, bio, inSpace], (error, result) => {
            if (check(error)) {
                return;
            }
            const row = result.rows[0];
            onDone({ id, name, age, bio, inSpace });
        });
    }
    assignStatusToAstronautsInTx(astronautId, statusId, pool, check, onDone) {
        pool.query('INSERT INTO public.astronauts_status (astronaut_id, status_id) VALUES ($1, $2)', [astronautId, statusId], (error, result) => {
            if (check(error)) {
                return;
            }
            const row = result.rows[0];
            onDone({ astronautId, statusId });
        });
    }
    assignAgencyToAstronautsInTx(astronautId, agencyId, pool, check, onDone) {
        pool.query('INSERT INTO public.agencies_astronauts (astronaut_id, agency_id) VALUES ($1, $2)', [astronautId, agencyId], (error, result) => {
            if (check(error)) {
                return;
            }
            const row = result.rows[0];
            onDone({ astronautId, agencyId });
        });
    }
    assignImageToAstronautsInTx(astronautId, imageId, pool, check, onDone) {
        pool.query('INSERT INTO public.astronauts_images (astronaut_id, image_id) VALUES ($1, $2)', [astronautId, imageId], (error, result) => {
            if (check(error)) {
                return;
            }
            const row = result.rows[0];
            onDone({ astronautId, imageId });
        });
    }
}
exports.SqlAstronautMutation = SqlAstronautMutation;
