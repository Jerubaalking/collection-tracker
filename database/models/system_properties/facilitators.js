const { Model, DataTypes, sequelize } = require("../../mysql");
const employers = require("./employers");
class facilitators extends Model { };
facilitators = sequelize.define('facilitators', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    descriptions: {
        type: DataTypes.STRING,
    }
}, { paranoid: true });
facilitators.belongsTo(employers);
employers.hasMany(facilitators);
module.exports = facilitators;