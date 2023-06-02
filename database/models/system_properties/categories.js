const { Model, Sequelize, sequelize } = require("../../mysql");
// const assets = require("../systems/assets");
class categories extends Model { };
categories = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    handler: {
        type: Sequelize.ENUM('charges', 'employer', 'employee', 'payment', 'transaction')
    },
    description: Sequelize.TEXT
}, { paranoid: true });
module.exports = categories;