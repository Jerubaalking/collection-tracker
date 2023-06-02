const { Model, DataTypes, sequelize } = require("../../mysql");
class facilities extends Model { };
facilities = sequelize.define('facilities', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    provider: {
        type: DataTypes.ENUM('government', 'private', 'none')
    },
    type: {
        type: DataTypes.ENUM('room', 'building', 'market', 'outside', 'wanderer'),
    }
}, { paranoid: true });
module.exports = facilities;