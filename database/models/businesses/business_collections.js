const { UUIDV4, DataTypes } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("../systems/businesses");
const collection_schedules = require("../collections/collection_schedules");
class business_collections extends Model { };
business_collections = sequelize.define('business_collections', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});
businesses.belongsToMany(collection_schedules, { through: business_collections });
collection_schedules.belongsToMany(businesses, { through: business_collections });

module.exports = business_collections;