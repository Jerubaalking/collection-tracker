const { UUIDV4 } = require("sequelize");
const { Model, sequelize, DataTypes } = require("../../mysql");
const categories = require("../system_properties/categories");
const charges = require("../system_properties/charges");
class charge_categories extends Model { };
charge_categories = sequelize.define('charge_categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: true
    },
    daily: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    weekly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    monthly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE
    }

});
categories.belongsToMany(charges, { through: charge_categories });
charges.belongsToMany(categories, { through: charge_categories });
charge_categories.belongsTo(charges);
charges.hasMany(charge_categories);
charge_categories.belongsTo(categories);
categories.hasMany(charge_categories);

module.exports = charge_categories;