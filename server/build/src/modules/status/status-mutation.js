"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlStatusMutation = void 0;
const sql_store_1 = require("../../db/sql-store");
class SqlStatusMutation extends sql_store_1.SqlStore {
    addAstronautStatus = async (id, name) => {
        return this.inTx((pool, check, onDone) => {
            this.addAstronautStatusInTx(id, name, pool, check, (status) => {
                onDone(null, status);
            });
        });
    };
    addAstronautStatusInTx(id, name, pool, check, onDone) {
        pool.query(`INSERT INTO public.status (id, name) VALUES ($1, $2)
            ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`, [id, name], (error, result) => {
            if (check(error)) {
                return;
            }
            const row = result.rows[0];
            onDone({ id, name });
        });
    }
}
exports.SqlStatusMutation = SqlStatusMutation;
