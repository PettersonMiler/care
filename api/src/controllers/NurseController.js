const Nurse = require("../models/Nurse");
const sequelize = require("../database");

module.exports = {
    async index(_, res) {
        const nurses = await Nurse.findAll();

        return res.json(nurses);
    },

    async create(req, res) {
        const { name, type } = req.body;

        const nurse = await Nurse.create({ name, type });

        return res.json(nurse);
    },

    async availableJobs(_, res) {
        const [results] = await sequelize.query(
            `select
                "nurses"."nurse_id",
                "nurses"."nurse_name",
                "nurses"."nurse_type",
                (COUNT("jobs"."job_id") - (select count(*) from "nurse_hired_jobs" where "nurse_hired_jobs"."nurse_id" = "nurses"."nurse_id")) as "available_jobs"
            from
                "nurses"
            left join
                "jobs" on
                "jobs"."nurse_type_needed" = "nurses"."nurse_type"
            group by
                "nurses"."nurse_id"
            order by
                "nurses"."nurse_id" asc;`
        );

        return res.json(results);
    },
};
