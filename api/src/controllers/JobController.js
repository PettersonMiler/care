const { literal } = require("sequelize");
const Facility = require("../models/Facility");
const Job = require("../models/Job");

module.exports = {
    async index(req, res) {
        const { facility_id } = req.params;

        const facility = await Facility.findByPk(facility_id, {
            include: { association: "jobs" },
        });

        return res.json(facility.jobs);
    },

    async getBy(req, res) {
        const { job_id } = req.params;

        const job = await Job.findByPk(job_id, {
            include: {
                association: "nurses",
                through: {
                    attributes: [],
                },
            },
        });

        if (!job) {
            return res.status(400).json({ error: "Job not found" });
        }

        return res.json({
            ...job.toJSON(),
            remaining_spots:
                job.total_number_nurses_needed - job.nurses?.length,
        });
    },

    async remainingSpots(_, res) {
        const jobs = await Job.findAll({
            attributes: [
                "job_id",
                [
                    literal(
                        `("Job"."total_number_nurses_needed" - COUNT("nurses->nurse_hired_jobs"."job_id"))`
                    ),
                    "remaining_spots",
                ],
            ],
            include: {
                association: "nurses",
                attributes: [],
                through: {
                    attributes: [],
                },
            },
            group: ["Job.job_id"],
            order: [["job_id", "ASC"]],
        });

        return res.json(jobs);
    },
};
