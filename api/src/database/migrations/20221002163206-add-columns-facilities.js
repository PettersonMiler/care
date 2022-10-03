"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn("facilities", "created_at", {
                type: Sequelize.DATE,
                allowNull: false,
            }),
            queryInterface.addColumn("facilities", "updated_at", {
                type: Sequelize.DATE,
                allowNull: false,
            }),
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn("facilities", "created_at"),
            queryInterface.removeColumn("facilities", "updated_at"),
        ]);
    },
};
