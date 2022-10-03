const { Model, DataTypes } = require("sequelize");

class Facility extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    field: "facility_id",
                    primaryKey: true,
                },
                facility_name: DataTypes.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Job, { foreignKey: "facility_id", as: "jobs" });
        this.hasMany(models.ClinicianWorkHistory, {
            foreignKey: "facility_id",
            as: "clinician_work_history",
        });
    }
}

module.exports = Facility;
