const { Model, sequelize, DataTypes } = require("../../mysql");
const categories = require("../system_properties/categories");
const payments = require("../system_properties/payments");
class payment_categories extends Model { };
payment_categories = sequelize.define('payment_categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
}, { paranoid: true });
payments.belongsToMany(categories, { through: payment_categories });
categories.belongsToMany(payments, { through: payment_categories });
payment_categories.hasMany(payments);
payment_categories.hasMany(categories);

module.exports = payment_categories;