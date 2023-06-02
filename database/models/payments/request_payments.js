const { Model, Sequelize, sequelize } = require("../../mysql");
const payments = require("../system_properties/payments");
const requests = require("../systems/requests");
class request_payments extends Model { };
request_payments = sequelize.define('reqs_pymnts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
payments.belongsToMany(requests, { through: request_payments });
requests.belongsToMany(payments, { through: request_payments });

module.exports = request_payments;