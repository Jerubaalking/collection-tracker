const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize, DataTypes } = require("../../mysql");
const employees = require("../system_properties/employees");
const collections = require("../systems/collections");
class employee_collections extends Model { };
employee_collections = sequelize.define('employee_collections', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    collected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});
employees.belongsToMany(collections, { through: employee_collections });
collections.belongsToMany(employees, { through: employee_collections });

module.exports = employee_collections;