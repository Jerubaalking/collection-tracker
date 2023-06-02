const { Model, DataTypes, sequelize } = require("../../mysql");
class languages extends Model { };
languages = sequelize.define('languages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { paranoid: true });
module.exports = languages;