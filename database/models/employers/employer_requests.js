const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const requests = require("../systems/requests");
class employer_requests extends Model { };
employer_requests = sequelize.define('employer_requests', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(requests, { through: employer_requests });
requests.belongsToMany(employers, { through: employer_requests });

module.exports = employer_requests;