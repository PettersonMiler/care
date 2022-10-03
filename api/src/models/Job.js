const { Model, DataTypes } = require("sequelize");

class Job extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    field: "job_id",
                    primaryKey: true,
                },
                nurse_type_needed: DataTypes.STRING,
                total_number_nurses_needed: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Facility, {
            foreignKey: "facility_id",
            as: "facilities",
        });
        this.belongsToMany(models.Nurse, {
            foreignKey: "job_id",
            through: "nurse_hired_jobs",
            as: "nurses",
        });
    }
}

module.exports = Job;
