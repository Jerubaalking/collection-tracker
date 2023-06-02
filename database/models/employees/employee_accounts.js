const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const accounts = require("../systems/accounts");
class employee_accounts extends Model { };
employee_accounts = sequelize.define('empr_acc', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(accounts, { through: employee_accounts });
accounts.belongsToMany(employees, { through: employee_accounts });

module.exports = employee_accounts;