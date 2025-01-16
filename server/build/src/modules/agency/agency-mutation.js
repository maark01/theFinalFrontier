"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAgencyMutation = void 0;
const sql_store_1 = require("../../db/sql-store");
class SqlAgencyMutation extends sql_store_1.SqlStore {
    addAgency = async (id, name, abbrev, foundingYear) => {
        return this.inTx((pool, check, onDone) => {
            this.addAgencyInTx(id, name, abbrev, foundingYear, pool, check, (agency) => {
                onDone(null, agency);
            });
        });
    };
    addAgencyInTx(id, name, abbrev, foundingYear, pool, check, onDone) {
        pool.query(`INSERT INTO public.agency (id, name, abbrev, founding_year) VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, abbrev = EXCLUDED.abbrev, founding_year = EXCLUDED.founding_year`, [id, name, abbrev, foundingYear], (error, result) => {
            if (check(error)) {
                return;
            }
            const row = result.rows[0];
            onDone({ id, name, abbrev, foundingYear });
        });
    }
}
exports.SqlAgencyMutation = SqlAgencyMutation;
