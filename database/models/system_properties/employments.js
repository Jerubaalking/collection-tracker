const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const employers = require("./employers");
class employments extends Model { };
employments = sequelize.define('employments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },

}, { paranoid: true });
employers.belongsToMany(employees, { through: employments });
employees.belongsToMany(employers, { through: employments });

module.exports = employments;