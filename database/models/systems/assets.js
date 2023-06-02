const { Model, Sequelize, sequelize } = require("../../mysql");
const uploads = require("../system_properties/uploads");
class assets extends Model { };
assets = sequelize.define('assets', {
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
    asset_type: {
        type: Sequelize.ENUM('moveable', 'un-movable', 'digital', 'unknown'),
        allowNull: false,
        defaultValue: 'unknown'

    },
    model: Sequelize.STRING,
    make: Sequelize.STRING,
    capacity: Sequelize.STRING,
    body_type: Sequelize.STRING,
    color: Sequelize.STRING,
    made_in: Sequelize.STRING,
}, { paranoid: true });
assets.belongsTo(uploads);
uploads.hasMany(assets)
module.exports = assets;