"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("jobs", {
            job_id: {
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
            nurse_type_needed: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            total_number_nurses_needed: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        return queryInterface.dropTable("jobs");
    },
};
