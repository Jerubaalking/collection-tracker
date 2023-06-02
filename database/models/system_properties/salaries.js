const { Model, Sequelize, sequelize } = require("../../mysql");
const currencies = require("../systems/currencies");
class salaries extends Model { };
salaries = sequelize.define('salaries', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
    },
    amount: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, { paranoid: true });
salaries.belongsTo(currencies);
currencies.hasMany(salaries);
module.exports = salaries;