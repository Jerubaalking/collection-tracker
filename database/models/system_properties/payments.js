const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const currencies = require('../systems/currencies');
class payments extends Model { };
payments = sequelize.define('payments', {
    id: {
        type: Sequelize.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    payment_for: {
        type: Sequelize.STRING,
        allowNull: false
    },
    payment_value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    payment_from: {
        type: Sequelize.STRING,
    },
    payment_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    payment_deadline: {
        type: Sequelize.DATE
    },
    payment_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, { paranoid: true });
payments.belongsTo(currencies);
currencies.hasMany(payments);
module.exports = payments;