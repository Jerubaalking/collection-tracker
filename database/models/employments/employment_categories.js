const { Model, Sequelize, sequelize } = require("../../mysql");
const categories = require("../system_properties/categories");
const employments = require("../system_properties/employments");
class employment_categories extends Model { };
employment_categories = sequelize.define('empt_categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employments.belongsToMany(categories, { through: employment_categories });
categories.belongsToMany(employments, { through: employment_categories });

module.exports = employment_categories;