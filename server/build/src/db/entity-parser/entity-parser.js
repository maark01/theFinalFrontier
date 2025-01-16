"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyParser = exports.AstronautParser = void 0;
class AstronautParser {
    parse(row) {
        return {
            id: +row.id,
            name: row.name,
            age: +row.age,
            bio: row.bio,
            inSpace: row.in_space,
            statusId: +row.status_id || null,
            statusName: row.status_name || null,
            agencyId: +row.agency_id || null,
            agencyName: row.agency_name || null,
            abbrev: row.abbrev || null,
            foundingYear: +row.founding_year || null,
            imageId: +row.image_id || null,
            imageName: row.image_name || null,
            imageUrl: row.image_url || null,
        };
    }
}
exports.AstronautParser = AstronautParser;
class AgencyParser {
    parse(row) {
        return {
            id: +row.id,
            name: row.name,
            abbrev: row.abbrev,
            foundingYear: +row.founding_year || null
        };
    }
}
exports.AgencyParser = AgencyParser;
