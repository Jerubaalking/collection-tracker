const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const checks = require("../systems/addresses");
class employer_checks extends Model { };
employer_checks = sequelize.define('empr_checks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(checks, { through: employer_checks });
checks.belongsToMany(employers, { through: employer_checks });

module.exports = employer_checks;