const { Model, Sequelize, sequelize } = require("../../mysql");
const payments = require("../system_properties/payments");
const requests = require("../systems/requests");
class subscription_payments extends Model { };
subscription_payments = sequelize.define('subsc_pymnts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
payments.belongsToMany(requests, { through: subscription_payments });
requests.belongsToMany(payments, { through: subscription_payments });

module.exports = subscription_payments;