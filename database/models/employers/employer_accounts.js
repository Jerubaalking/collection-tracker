const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const accounts = require("../systems/accounts");
class employer_account extends Model { };
employer_account = sequelize.define('empr_acc', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(accounts, { through: employer_account });
accounts.belongsToMany(employers, { through: employer_account });

module.exports = employer_account;