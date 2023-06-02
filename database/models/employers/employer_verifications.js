const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const verifications = require("../system_properties/verifications");
class employer_verifications extends Model { };
employer_verifications = sequelize.define('employer_verifications', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(verifications, { through: employer_verifications });
verifications.belongsToMany(employers, { through: employer_verifications });

module.exports = employer_verifications;