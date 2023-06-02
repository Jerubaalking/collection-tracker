const { Model, DataTypes, sequelize } = require("../../mysql");
const uploads = require("./uploads");
class employers extends Model { };
employers = sequelize.define('employers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM('employing', 'reserved', 'scouting', 'unknown'),
        defaultValue: 'unknown'
    },
}, { paranoid: true });
employers.belongsTo(uploads);
uploads.hasMany(employers);
module.exports = employers;