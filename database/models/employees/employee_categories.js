const { Model, Sequelize, sequelize } = require("../../mysql");
const categories = require("../system_properties/categories");
const employees = require("../system_properties/employees");
class employee_categories extends Model { };
employee_categories = sequelize.define('employee_categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(categories, { through: employee_categories });
categories.belongsToMany(employees, { through: employee_categories });

module.exports = employee_categories;