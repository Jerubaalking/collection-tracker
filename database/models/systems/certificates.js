const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const regulators = require("../system_properties/regulators");
const uploads = require("../system_properties/uploads");
class certificates extends Model { };
certificates = sequelize.define('certificates', {
    id: {
        type: Sequelize.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    issue_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
}, { paranoid: true });
certificates.belongsTo(regulators);
regulators.hasMany(certificates);
certificates.belongsTo(uploads);
uploads.hasMany(certificates);
module.exports = certificates;