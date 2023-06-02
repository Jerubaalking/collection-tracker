const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const addresses = require("../systems/addresses");
class employer_addresses extends Model { };
employer_addresses = sequelize.define('empr_addr', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(addresses, { through: employer_addresses });
addresses.belongsToMany(employers, { through: employer_addresses });
employer_addresses.belongsTo(employers);
employer_addresses.belongsTo(addresses);

module.exports = employer_addresses;