const { Model, Sequelize, sequelize } = require("../../mysql");
const currencies = require("./currencies");
const supports = require("./supports");

class currency_supports extends Model { };
currency_supports = sequelize.define('currency_supports', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
currencies.belongsToMany(supports, { through: currency_supports });
supports.belongsToMany(currencies, { through: currency_supports });

module.exports = currency_supports;