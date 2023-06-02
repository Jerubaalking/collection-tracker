const { Model, Sequelize, sequelize } = require("../../mysql");
const employers = require("./employers");
class maintenances extends Model { };
maintenances = sequelize.define('maintenances', {
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
    descriptions: {
        type: Sequelize.STRING,
        allowNull: false
    },
    occurance: {
        type: Sequelize.ENUM('request', 'scheduled'),
        allowNull: false,
        defaultValue: 'request'

    }
}, { paranoid: true });
module.exports = maintenances;