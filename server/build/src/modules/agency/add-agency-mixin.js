"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAddAgencyMixin = void 0;
const sql_store_1 = require("../../db/sql-store");
class SqlAddAgencyMixin extends sql_store_1.SqlStore {
    insertAgency(id, name, abbrev, foundingYear) {
        return this.inTx((pool, check, onDone) => {
            this.addAgencyInTx(id, name, abbrev, foundingYear, pool, check, (agency) => {
                onDone(null, {
                    id: agency.id, name: agency.name, abbrev: agency.abbrev, foundingYear: agency.foundingYear,
                });
            });
        });
    }
}
exports.SqlAddAgencyMixin = SqlAddAgencyMixin;
