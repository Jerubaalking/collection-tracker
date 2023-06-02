const { Model, Sequelize, sequelize } = require("../../mysql");
const facilitators = require("../system_properties/facilitators");
const payments = require("../system_properties/payments");
class payment_facilitators extends Model { };
payment_facilitators = sequelize.define('payment_facilitators', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
}, { paranoid: true });
payments.belongsToMany(facilitators, { through: payment_facilitators });
facilitators.belongsToMany(payments, { through: payment_facilitators });
payment_facilitators.hasMany(payments);
payment_facilitators.hasMany(facilitators);

module.exports = payment_facilitators;