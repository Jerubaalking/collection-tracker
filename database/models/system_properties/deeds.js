const { Model, Sequelize, sequelize } = require("../../mysql");
const regulators = require("./regulators");
class deeds extends Model { };
deeds = sequelize.define('deeds', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
    identifier: {
        type: Sequelize.STRING,
        allowNull: false
    },
    issued_date: {
        type: Sequelize.DATE,
    },
    expire_date: {
        type: Sequelize.DATE,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    valid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
}, { paranoid: true });
deeds.belongsTo(regulators);
regulators.hasMany(deeds);
module.exports = deeds;