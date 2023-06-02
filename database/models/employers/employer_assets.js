const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const assets = require("../systems/assets");
class employer_assets extends Model { };
employer_assets = sequelize.define('employer_assets', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(assets, { through: employer_assets });
assets.belongsToMany(employers, { through: employer_assets });

module.exports = employer_assets;