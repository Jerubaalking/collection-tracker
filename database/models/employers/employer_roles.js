const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const roles = require("../systems/roles");
class employer_roles extends Model { };
employer_roles = sequelize.define('employer_roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(roles, { through: employer_roles });
roles.belongsToMany(employers, { through: employer_roles });

module.exports = employer_roles;