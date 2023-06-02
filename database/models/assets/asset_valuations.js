const { Model, Sequelize, sequelize } = require("../../mysql");
const valuations = require("../system_properties/valuations");
const assets = require("../system_properties/employers");
class asset_valuations extends Model { };
asset_valuations = sequelize.define('asset_valuations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
assets.belongsToMany(valuations, { through: asset_valuations });
valuations.belongsToMany(assets, { through: asset_valuations });

module.exports = asset_valuations;