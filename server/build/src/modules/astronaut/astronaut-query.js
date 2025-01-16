"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAstronautQuery = void 0;
const sql_store_1 = require("../../db/sql-store");
class SqlAstronautQuery extends sql_store_1.SqlStore {
    astronautParser;
    constructor(db, astronautParser) {
        super(db);
        this.astronautParser = astronautParser;
    }
    getAllAstronauts = async () => {
        return await this.query(`SELECT ast.id AS "id", ast.name AS "name", ast.age AS "age", ast.bio AS "bio", ast.in_space AS "in space",
                stat.id AS "status_id", stat.name AS "status_name",
                ag.id AS "agency_id", ag.name AS "agency_name", ag.abbrev AS "abbrev", ag.founding_year AS "founding_year",
                img.id AS "image_id", img.name AS "image_name", img.image_url AS "image_url"
            FROM 
                astronaut ast
            LEFT JOIN 
                astronauts_status aststat ON aststat.astronaut_id = ast.id
			LEFT JOIN 
   				 agencies_astronauts agast ON agast.astronaut_id = ast.id
			LEFT JOIN 
    			agency ag ON ag.id = agast.agency_id
            LEFT JOIN
                status stat ON stat.id = aststat.status_id
            LEFT JOIN 
                astronauts_images astimg ON astimg.astronaut_id = ast.id
            LEFT JOIN 
                image img ON img.id = astimg.image_id
            ORDER BY
	            ast.id ASC;`, [], this.astronautParser.parse);
    };
}
exports.SqlAstronautQuery = SqlAstronautQuery;
