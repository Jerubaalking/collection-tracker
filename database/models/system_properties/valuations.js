const { Model, Sequelize, sequelize } = require("../../mysql");
class valuations extends Model { };
valuations = sequelize.define('valuations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    descriptions: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    attained_by: {
        type: Sequelize.STRING
    },
    valuation_date: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    }
}, { paranoid: true });
module.exports = valuations;