const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("../systems/businesses");
const regulators = require("./regulators");
const uploads = require("./uploads");
class licenses extends Model { };
licenses = sequelize.define('licenses', {
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
licenses.belongsTo(regulators);
regulators.hasMany(licenses);
licenses.belongsTo(uploads);
uploads.hasMany(licenses);
module.exports = licenses;