const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const regulators = require("../system_properties/regulators");
const uploads = require("../system_properties/uploads");
const businesses = require("../systems/businesses");
const users = require("../systems/users");
class tins extends Model { };
tins = sequelize.define('tins', {
    id: {
        type: Sequelize.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    tin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    issue_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
}, { paranoid: true });
tins.belongsTo(regulators);
regulators.hasMany(tins);
tins.belongsTo(uploads);
// uploads.hasOne(tins);
businesses.belongsTo(tins);
tins.hasOne(businesses);
users.belongsTo(tins);
tins.hasOne(users);
module.exports = tins;