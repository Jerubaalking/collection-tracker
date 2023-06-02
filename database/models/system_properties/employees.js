const { Model, DataTypes, sequelize } = require("../../mysql");
const uploads = require("./uploads");
class employees extends Model { };
employees = sequelize.define('employees', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM('unemployed', 'employed', 'suspended', 'unknown'),
        defaultValue: 'unknown'
    },
}, { paranoid: true });
employees.belongsTo(uploads);
uploads.hasMany(employees)
module.exports = employees;