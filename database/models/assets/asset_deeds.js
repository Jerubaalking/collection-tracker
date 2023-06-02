const { Model, Sequelize, sequelize } = require("../../mysql");
const deeds = require("../system_properties/deeds");
const assets = require("../system_properties/employers");
class asset_deeds extends Model { };
asset_deeds = sequelize.define('asset_deeds', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
assets.belongsToMany(deeds, { through: asset_deeds });
deeds.belongsToMany(assets, { through: asset_deeds });

module.exports = asset_deeds;