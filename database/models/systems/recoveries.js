const { Model, DataTypes, sequelize } = require("../../mysql");
class recoveries extends Model { };
recoveries = sequelize.define('recoveries', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    }
}, { paranoid: true });
module.exports = recoveries;