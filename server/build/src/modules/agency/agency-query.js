"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAgencyQuery = void 0;
const sql_store_1 = require("../../db/sql-store");
class SqlAgencyQuery extends sql_store_1.SqlStore {
    agencyParser;
    constructor(db, agencyParser) {
        super(db);
        this.agencyParser = agencyParser;
    }
    getAllAgencies = async () => {
        return await this.query(`SELECT id, name, abbrev, founding_year FROM public.agency `, [], this.agencyParser.parse);
    };
}
exports.SqlAgencyQuery = SqlAgencyQuery;
