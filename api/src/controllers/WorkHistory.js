const WorkHistory = require("../models/ClinicianWorkHistory");

module.exports = {
    async index(_, res) {
        const workHistories = await WorkHistory.findAll();

        return res.json(workHistories);
    },

    async create(req, res) {
        const { name, type } = req.body;

        const workHistory = await WorkHistory.create({ name, type });

        return res.json(workHistory);
    },
};
