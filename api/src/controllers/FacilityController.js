const { isEmpty, has, add, subtract } = require("ramda");
const Facility = require("../models/Facility");

module.exports = {
    async index(_, res) {
        const facilities = await Facility.findAll();

        return res.json(facilities);
    },

    async hiringPriority(req, res) {
        const { facility_id } = req.params;

        const facility = await Facility.findByPk(facility_id, {
            include: { association: "clinician_work_history" },
        });

        if (!facility) {
            return res.status(400).json({ error: "Facility not found" });
        }

        const { clinician_work_history } = facility;

        if (isEmpty(clinician_work_history)) {
            return res.json([]);
        }

        const pointsByNurses = {};

        clinician_work_history.forEach((history) => {
            const { nurse_id, worked_shift, call_out, no_call_no_show } =
                history;

            if (!has(nurse_id, pointsByNurses)) {
                pointsByNurses[nurse_id] = 0;
            }

            if (worked_shift) {
                pointsByNurses[nurse_id] = add(pointsByNurses[nurse_id], 1);
            }

            if (call_out) {
                pointsByNurses[nurse_id] = subtract(
                    pointsByNurses[nurse_id],
                    3
                );
            }

            if (no_call_no_show) {
                pointsByNurses[nurse_id] = subtract(
                    pointsByNurses[nurse_id],
                    5
                );
            }
        });

        const hiringPriority = Object.keys(pointsByNurses)
            .sort((a, b) => {
                if (pointsByNurses[a] === pointsByNurses[b]) {
                    return a - b;
                }

                return pointsByNurses[a] - pointsByNurses[b];
            })
            .map((id) => ({ nurse_id: id }))
            .reverse();

        return res.json(hiringPriority);
    },
};
