const { Model, Sequelize, sequelize } = require("../../mysql");
const transaction_methods = require("./methods");
class accounts extends Model { };
accounts = sequelize.define('accounts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    account: {
        type: Sequelize.STRING,
        allowNull: false
    },
    acc_no: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, { paranoid: true });
accounts.belongsTo(transaction_methods);
transaction_methods.hasMany(accounts);
module.exports = accounts;