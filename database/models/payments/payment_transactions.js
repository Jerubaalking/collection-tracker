const { Model, Sequelize, sequelize } = require("../../mysql");
const { methods } = require("../module_exporter");
const payment_categories = require("../payments/payment_categories");
const transactions = require("../systems/transactions");
class payment_transactions extends Model { };
payment_transactions = sequelize.define('pymnt_transc', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
payment_categories.belongsToMany(transactions, { through: payment_transactions });
transactions.belongsToMany(payment_categories, { through: payment_transactions });
payment_transactions.hasMany(transactions);
payment_transactions.hasMany(payment_categories);
payment_transactions.belongsTo(methods);
methods.hasMany(payment_transactions);

module.exports = payment_transactions;