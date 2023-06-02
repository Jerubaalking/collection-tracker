const {  UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
// const employers = require("../employers/employers");
// const employees = require("./employees");
class contracts extends Model { };
contracts = sequelize.define('contracts', {
    id: {
        type: Sequelize.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    fileUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    format: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriptions: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    valid: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, { paranoid: true });
module.exports = contracts;