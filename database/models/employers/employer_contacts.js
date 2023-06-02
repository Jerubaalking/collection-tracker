const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const contacts = require("../systems/contacts");
class employer_contacts extends Model { };
employer_contacts = sequelize.define('employer_contacts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(contacts, { through: employer_contacts });
contacts.belongsToMany(employers, { through: employer_contacts });
employer_contacts.belongsTo(contacts)
employer_contacts.belongsTo(employers);

module.exports = employer_contacts;