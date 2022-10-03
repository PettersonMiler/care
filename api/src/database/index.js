const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Facility = require("../models/Facility");
const Nurse = require("../models/Nurse");
const Job = require("../models/Job");
const ClinicianWorkHistory = require("../models/ClinicianWorkHistory");

const connection = new Sequelize(dbConfig);

Facility.init(connection);
Job.init(connection);
Nurse.init(connection);
ClinicianWorkHistory.init(connection);

Facility.associate(connection.models);
Job.associate(connection.models);
Nurse.associate(connection.models);
ClinicianWorkHistory.associate(connection.models);

module.exports = connection;
