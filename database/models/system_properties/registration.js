const { Model, Sequelize, sequelize } = require("../../mysql");
const regulators = require("./regulators");
const uploads = require("./uploads");
class registrations extends Model { };
registrations = sequelize.define('registrations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identifier: {
        type: Sequelize.STRING,
        allowNull: false
    },
    issued_to: {
        type: Sequelize.STRING,
    },
    issued_date: {
        type: Sequelize.DATE,
    },
    expire_date: {
        type: Sequelize.DATE,
    },
}, { paranoid: true });
registrations.belongsTo(regulators);
regulators.hasMany(registrations);
registrations.belongsTo(uploads);
uploads.hasMany(registrations);
module.exports = registrations;