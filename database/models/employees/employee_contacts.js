const { Model, Sequelize, sequelize } = require("../../mysql");
const employees = require("../system_properties/employees");
const contacts = require("../systems/contacts");
class employee_contacts extends Model { };
employee_contacts = sequelize.define('employee_contacts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(contacts, { through: employee_contacts });
contacts.belongsToMany(employees, { through: employee_contacts });
employee_contacts.belongsTo(employees);
employee_contacts.belongsTo(contacts);

module.exports = employee_contacts;