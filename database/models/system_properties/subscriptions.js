const { Model, Sequelize, sequelize } = require("../../mysql");
const currencies = require("../systems/currencies");
class subscriptions extends Model { };
subscriptions = sequelize.define('subscriptions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    descriptions: {
        type: Sequelize.STRING,
    },
    active: {
        type: Sequelize.BOOLEAN,
    }
}, { paranoid: true });
subscriptions.belongsTo(currencies);
currencies.hasMany(subscriptions);
module.exports = subscriptions;