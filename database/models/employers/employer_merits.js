const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const merits = require("../systems/merits");
class employer_merits extends Model { };
employer_merits = sequelize.define('employer_merits', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(merits, { through: employer_merits });
merits.belongsToMany(employers, { through: employer_merits });

module.exports = employer_merits;