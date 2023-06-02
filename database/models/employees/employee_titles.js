const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const titles = require("../system_properties/titles");
class employee_titles extends Model { };
employee_titles = sequelize.define('employee_titles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(titles, { through: employee_titles });
titles.belongsToMany(employees, { through: employee_titles });
employee_titles.belongsTo(employees);
employee_titles.belongsTo(titles);

module.exports = employee_titles;