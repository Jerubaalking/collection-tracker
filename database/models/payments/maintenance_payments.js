const { Model, Sequelize, sequelize } = require("../../mysql");
const payments = require("../system_properties/payments");
const requests = require("../systems/requests");
class maintenance_payments extends Model { };
maintenance_payments = sequelize.define('maint_pymnts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
payments.belongsToMany(requests, { through: maintenance_payments });
requests.belongsToMany(payments, { through: maintenance_payments });

module.exports = maintenance_payments;