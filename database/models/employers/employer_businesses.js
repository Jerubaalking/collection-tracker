const { Model, Sequelize, sequelize } = require("../../mysql");
const categories = require("../system_properties/categories");
const employers = require("../system_properties/employers");
class employer_businesses extends Model { };
employer_businesses = sequelize.define('employer_businesses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(categories, { through: employer_businesses });
categories.belongsToMany(employers, { through: employer_businesses });

module.exports = employer_businesses;