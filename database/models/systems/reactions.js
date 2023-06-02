const { Model, DataTypes, sequelize, Sequelize } = require("../../mysql");
class reactions extends Model { };
reactions = sequelize.define('reactions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    point: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});
module.exports = reactions;