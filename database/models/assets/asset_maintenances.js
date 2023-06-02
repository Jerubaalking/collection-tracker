const { Model, Sequelize, sequelize } = require("../../mysql");
const maintenances = require("../system_properties/maintenances");
const assets = require("../system_properties/employers");
class asset_maintenances extends Model { };
asset_maintenances = sequelize.define('asset_maintenances', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
assets.belongsToMany(maintenances, { through: asset_maintenances });
maintenances.belongsToMany(assets, { through: asset_maintenances });

module.exports = asset_maintenances;