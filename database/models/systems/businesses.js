/** clients **/
const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const scales = require("../system_properties/scales");
const certificates = require("./certificates");
class businesses extends Model { };
businesses = sequelize.define('businesses', {
    id: {
        type: Sequelize.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { paranoid: true });
businesses.belongsTo(scales);
scales.hasMany(businesses);
businesses.belongsTo(certificates);
certificates.hasMany(businesses);
module.exports = businesses;