const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const roles = require("../systems/roles");
class employee_roles extends Model { };
employee_roles = sequelize.define('employee_roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }

});
employees.belongsToMany(roles, { through: employee_roles });
roles.belongsToMany(employees, { through: employee_roles });
employee_roles.belongsTo(employees);
employee_roles.belongsTo(roles);

module.exports = employee_roles;