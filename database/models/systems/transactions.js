const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const currencies = require("./currencies");
class transactions extends Model { };
transactions = sequelize.define('transactions', {
    id: {
        type: Sequelize.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
    },
    amount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receipt: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, { paranoid: true });
transactions.belongsTo(currencies);
transactions.belongsTo(currencies);
module.exports = transactions;