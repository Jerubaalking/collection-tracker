const { DataTypes } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
// const employers = require("./employers");
class charges extends Model { };
charges = sequelize.define('charges', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT
    }
}, { paranoid: true });
module.exports = charges;