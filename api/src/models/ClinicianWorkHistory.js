const { Model, DataTypes } = require("sequelize");

class ClinicianWorkHistory extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    field: "work_history_id",
                    primaryKey: true,
                },
                worked_shift: DataTypes.BOOLEAN,
                call_out: DataTypes.BOOLEAN,
                no_call_no_show: DataTypes.BOOLEAN,
            },
            {
                sequelize,
                freezeTableName: true,
                tableName: "clinician_work_history",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Nurse, {
            foreignKey: "nurse_id",
            as: "nurses",
        });
        this.belongsTo(models.Facility, {
            foreignKey: "facility_id",
            as: "facilities",
        });
    }
}

module.exports = ClinicianWorkHistory;
