const { Model, Sequelize, sequelize } = require("../../mysql");
const uploads = require("../system_properties/uploads");
const identities = require("../systems/identities");
class identity_uploads extends Model { };
identity_uploads = sequelize.define('identity_uploads', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
identities.belongsToMany(uploads, { through: identity_uploads });
uploads.belongsToMany(identities, { through: identity_uploads });

module.exports = identity_uploads;