const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const verifications = require("../system_properties/verifications");
class employee_verifications extends Model { };
employee_verifications = sequelize.define('employee_verfs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(verifications, { through: employee_verifications });
verifications.belongsToMany(employees, { through: employee_verifications });

module.exports = employee_verifications;