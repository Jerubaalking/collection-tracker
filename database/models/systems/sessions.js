const { Model, DataTypes, sequelize } = require("../../mysql");
class sessions extends Model { };
sessions = sequelize.define('sessions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, { paranoid: true});
module.exports = sessions;