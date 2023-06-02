const { Model, Sequelize, sequelize } = require("../../mysql");
const uploads = require("../system_properties/uploads");
const certificates = require("./certificates");
class outsources extends Model { };
outsources = sequelize.define('outsources', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { paranoid: true });
outsources.belongsTo(uploads);
uploads.hasMany(outsources);
outsources.belongsTo(certificates, { as: 'tin_number' });
certificates.hasMany(outsources, { as: 'tin_number' });
module.exports = outsources;