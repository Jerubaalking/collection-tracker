const { Model, Sequelize, sequelize } = require("../../mysql");
class depreciations extends Model { };
depreciations = sequelize.define('depreciations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    percent: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    dpr_rate: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    dpr_time: {
        type: Sequelize.ENUM('hours', 'days', 'weeks', 'months', 'years')
    }
}, { paranoid: true });
module.exports = depreciations;