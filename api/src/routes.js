const express = require("express");
const FacilityController = require("./controllers/FacilityController");
const JobController = require("./controllers/JobController");
const NurseController = require("./controllers/NurseController");
const WorkHistory = require("./controllers/WorkHistory");

const routes = express.Router();

routes.get("/facilities", FacilityController.index);
routes.get("/facilities/:facility_id/jobs", JobController.index);

routes.get(
    "/facilities/:facility_id/hiring-priority",
    FacilityController.hiringPriority
);

routes.get("/jobs/remaining-spots", JobController.remainingSpots);
routes.get("/jobs/:job_id", JobController.getBy);

routes.get("/nurses/available-jobs", NurseController.availableJobs);

module.exports = routes;
