const { Model, Sequelize, sequelize } = require("../../mysql");
class appreciations extends Model { };
appreciations = sequelize.define('appreciations', {
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
    apr_value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    apr_time: {
        type: Sequelize.ENUM,
        values: ['hours', 'days', 'weeks', 'months', 'years']
    },
    reason: {
        type: Sequelize.STRING
    }
}, { paranoid: true });
module.exports = appreciations;