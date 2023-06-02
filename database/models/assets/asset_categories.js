const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const categories = require("../system_properties/categories");
const assets = require("../system_properties/employers");
class asset_categories extends Model { };
asset_categories = sequelize.define('asset_categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
assets.belongsToMany(categories, { through: asset_categories });
categories.belongsToMany(assets, { through: asset_categories });

module.exports = asset_categories;