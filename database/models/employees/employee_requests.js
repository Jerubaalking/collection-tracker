const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("../system_properties/employers");
const requests = require("../systems/requests");
class employee_requests extends Model { };
employee_requests = sequelize.define('employee_requests', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employers.belongsToMany(requests, { through: employee_requests });
requests.belongsToMany(employers, { through: employee_requests });

module.exports = employee_requests;