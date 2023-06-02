const { Model, DataTypes, sequelize } = require("../../mysql");
class scales extends Model { };
scales = sequelize.define('scales', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.ENUM('micro', 'small', 'medium', 'large', 'international', 'undefined'),
        defaultValue: 'undefined'
    },
    condition: {
        type: DataTypes.ENUM('worse', 'bad', 'okay', 'good', 'better', 'best'),
        defaultValue: 'okay'
    }
}, { paranoid: true });
module.exports = scales;