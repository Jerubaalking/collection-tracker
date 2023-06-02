const { Model, DataTypes, sequelize } = require("../../mysql");
class assessments extends Model { };
assessments = sequelize.define('assessments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
}, { paranoid: true });
module.exports = assessments;