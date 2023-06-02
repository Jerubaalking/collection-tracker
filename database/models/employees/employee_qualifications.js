const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const merits = require("../systems/merits");
class employee_qualifications extends Model { };
employee_qualifications = sequelize.define('employee_qlfs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(merits, { through: employee_qualifications });
merits.belongsToMany(employees, { through: employee_qualifications });

module.exports = employee_qualifications;