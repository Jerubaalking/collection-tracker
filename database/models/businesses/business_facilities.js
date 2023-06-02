const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("../systems/businesses");
const facilities = require("../system_properties/facilities");
class business_facilities extends Model { };
business_facilities = sequelize.define('business_facilities', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
businesses.belongsToMany(facilities, { through: business_facilities});
facilities.belongsToMany(businesses, { through: business_facilities });
facilities.belongsTo(business_facilities);
business_facilities.hasMany(facilities);
businesses.belongsTo(business_facilities);
business_facilities.hasMany(businesses);

module.exports = business_facilities;