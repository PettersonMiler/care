const { Model, DataTypes } = require("sequelize");

class Nurse extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    field: "nurse_id",
                    primaryKey: true,
                },
                nurse_name: DataTypes.STRING,
                nurse_type: DataTypes.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.belongsToMany(models.Job, {
            foreignKey: "nurse_id",
            through: "nurse_hired_jobs",
            as: "jobs",
        });
        this.hasMany(models.ClinicianWorkHistory, {
            foreignKey: "nurse_id",
            as: "clinician_work_history",
        });
    }
}

module.exports = Nurse;
