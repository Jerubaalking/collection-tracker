const { Model, Sequelize, sequelize } = require("../../mysql");
const categories = require("../system_properties/categories");
const employers = require("../system_properties/employers");
class employer_categories extends Model { };
employer_categories = sequelize.define('employer_categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(categories, { through: employer_categories });
categories.belongsToMany(employers, { through: employer_categories });

module.exports = employer_categories;