const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("../systems/businesses");
const licenses = require("../system_properties/licenses");
class business_licenses extends Model { };
business_licenses = sequelize.define('business_licenses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
businesses.belongsToMany(licenses, { through: business_licenses });
licenses.belongsToMany(businesses, { through: business_licenses });
licenses.belongsTo(business_licenses);
business_licenses.hasMany(licenses);
businesses.belongsTo(business_licenses);
business_licenses.hasMany(businesses);

module.exports = business_licenses;