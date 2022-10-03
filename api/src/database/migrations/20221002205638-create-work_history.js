"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("clinician_work_history", {
            work_history_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            facility_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "facilities", key: "facility_id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            nurse_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "nurses", key: "nurse_id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            worked_shift: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            call_out: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            no_call_no_show: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable("clinician_work_history");
    },
};
