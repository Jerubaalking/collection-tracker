const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const charge_categories = require("../charges/charge_categories");
class employer_charges extends Model { };
employer_charges = sequelize.define('employer_charges', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(charge_categories, { through: employer_charges });
charge_categories.belongsToMany(employers, { through: employer_charges });
employer_charges.hasMany(charge_categories);
employer_charges.hasMany(employers);

module.exports = employer_charges;