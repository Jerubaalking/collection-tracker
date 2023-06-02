const { Model, DataTypes, sequelize } = require("../../mysql");
const sessions = require("../systems/sessions");
class verifications extends Model { };
verifications = sequelize.define('verifications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('verified', 'pending', 'requested', 'none'),
    },
    start: DataTypes.DATE,
    timeout: {
        type: DataTypes.INTEGER,
        comment: 'in seconds',
        defaultValue: 60
    }
});
verifications.belongsTo(sessions);
sessions.hasMany(verifications);
module.exports = verifications;