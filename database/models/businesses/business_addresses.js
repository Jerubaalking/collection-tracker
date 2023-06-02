const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("../systems/businesses");
const addresses = require("../systems/addresses");
class business_addresses extends Model { };
business_addresses = sequelize.define('business_addresses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
businesses.belongsToMany(addresses, { through: business_addresses });
addresses.belongsToMany(businesses, { through: business_addresses });
businesses.hasMany(business_addresses);
business_addresses.belongsTo(businesses);
addresses.hasMany(business_addresses);
business_addresses.belongsTo(addresses);

module.exports = business_addresses;