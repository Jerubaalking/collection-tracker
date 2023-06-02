const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("../systems/businesses");
const categories = require("../system_properties/categories");
class business_categories extends Model { };
business_categories = sequelize.define('business_categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
businesses.belongsToMany(categories, { through: business_categories });
categories.belongsToMany(businesses, { through: business_categories });
categories.belongsTo(business_categories);
business_categories.hasMany(categories);
businesses.belongsTo(business_categories);
business_categories.hasMany(businesses);

module.exports = business_categories;