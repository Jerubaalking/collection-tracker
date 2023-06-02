const { Model, Sequelize, sequelize } = require("../../mysql");
const assets = require("../systems/assets");
const registrations = require("../system_properties/registration");
class asset_registrations extends Model { };
asset_registrations = sequelize.define('asset_registrations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
assets.belongsToMany(registrations, { through: asset_registrations });
registrations.belongsToMany(assets, { through: asset_registrations });

module.exports = asset_registrations;