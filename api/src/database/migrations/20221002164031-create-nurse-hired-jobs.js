"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("nurse_hired_jobs", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            job_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "jobs", key: "job_id" },
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
        return queryInterface.dropTable("nurse_hired_jobs");
    },
};
