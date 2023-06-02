const { UUIDV4, DataTypes } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const regulators = require("../system_properties/regulators");
class identities extends Model { };
identities = sequelize.define('identities', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_life: {
        type: DataTypes.INTEGER,
        comment: 'life in months'
    },
    issue_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expire_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    image_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
}, { paranoid: true });
identities.belongsTo(regulators);
regulators.hasMany(identities);
module.exports = identities;