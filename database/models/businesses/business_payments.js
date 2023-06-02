const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("../systems/businesses");
const payments = require("../system_properties/payments");
class business_payments extends Model { };
business_payments = sequelize.define('business_payments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
businesses.belongsToMany(payments, { through: business_payments });
payments.belongsToMany(businesses, { through: business_payments });
payments.belongsTo(business_payments);
business_payments.hasMany(payments);
businesses.belongsTo(business_payments);
business_payments.hasMany(businesses);

module.exports = business_payments;