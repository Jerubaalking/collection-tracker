/** Makusanyo collectons */
const { UUIDV4, DATE } = require("sequelize");
const { Model, DataTypes, sequelize, Sequelize } = require("../../mysql");
class collections extends Model { };
collections = sequelize.define('collections', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DATE,

    }
});
module.exports = collections;