"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAddAstronautMixin = void 0;
const sql_store_1 = require("../../db/sql-store");
class SqlAddAstronautMixin extends sql_store_1.SqlStore {
    insertAstronaut(id, name, age, bio, inSpace, status, agency, image) {
        return this.inTx((pool, check, onDone) => {
            this.addAstronautInTx(id, name, age, bio, inSpace, pool, check, (astronaut) => {
                this.addAstronautStatusInTx(status.id, status.name, pool, check, (status) => {
                    this.addAstronautImageInTx(image.id, image.name, image.imageUrl, pool, check, (image) => {
                        this.assignStatusToAstronautsInTx(id, status.id, pool, check, () => {
                            this.assignAgencyToAstronautsInTx(id, agency.id, pool, check, () => {
                                this.assignImageToAstronautsInTx(id, image.id, pool, check, () => {
                                    onDone(null, {
                                        id: astronaut.id, name: astronaut.name, age: astronaut.age, bio: astronaut.bio, inSpace: astronaut.inSpace,
                                        statusId: status.id, statusName: status.name,
                                        agencyId: agency.id, agencyName: agency.name, abbrev: agency.abbrev, foundingYear: agency.foundingYear,
                                        imageId: image.id, imageName: image.name, imageUrl: image.imageUrl,
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}
exports.SqlAddAstronautMixin = SqlAddAstronautMixin;
