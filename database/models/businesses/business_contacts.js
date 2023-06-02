const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("../systems/businesses");
const contacts = require("../systems/contacts");
class business_contacts extends Model { };
business_contacts = sequelize.define('business_contacts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
businesses.belongsToMany(contacts, { through: business_contacts });
contacts.belongsToMany(businesses, { through: business_contacts });
contacts.hasMany(business_contacts);
business_contacts.belongsTo(contacts);
businesses.hasMany(business_contacts);
business_contacts.belongsTo(businesses);

module.exports = business_contacts;