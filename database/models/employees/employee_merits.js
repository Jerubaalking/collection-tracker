const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const merits = require("../systems/merits");
class employee_merits extends Model { };
employee_merits = sequelize.define('employee_merits', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(merits, { through: employee_merits });
merits.belongsToMany(employees, { through: employee_merits });
employee_merits.belongsTo(merits);
employee_merits.belongsTo(employees);

module.exports = employee_merits;