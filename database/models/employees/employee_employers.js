const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const employers = require("../system_properties/employers");
class employee_employers extends Model { };
employee_employers = sequelize.define('employee_employers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(employers, { through: employee_employers });
employers.belongsToMany(employees, { through: employee_employers });
employee_employers.belongsTo(employees);
employee_employers.belongsTo(employers);

module.exports = employee_employers;