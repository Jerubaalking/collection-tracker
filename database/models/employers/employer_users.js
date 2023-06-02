const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const users = require("../systems/users");
class employer_users extends Model { };
employer_users = sequelize.define('employer_users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(users, { through: employer_users });
users.belongsToMany(employers, { through: employer_users });

module.exports = employer_users;