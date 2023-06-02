const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize, Sequelize } = require("../../mysql");
class complains extends Model { };
complains = sequelize.define('complains', {
    id: {
        type: Sequelize.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique:true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complain: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('misconduct', 'complain', 'crime'),
        allowNull: false,
        defaultValue: 'misconduct'
    },
    effect_level: {
        type: DataTypes.ENUM('okay', 'low', 'medium', 'high', 'servere'),
        defaultValue: 'low'
    }
});
module.exports = complains;