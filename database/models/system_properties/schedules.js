const { Model, Sequelize, sequelize, DataTypes } = require("../../mysql");
class schedules extends Model { };
schedules = sequelize.define('schedules', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
    },
    repeat_after: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    repeat_type: {
        type: DataTypes.ENUM('minutes', 'hours', 'days', 'months', 'years'),
        allowNull: false,
        defaultValue: 'minutes'
    },
    repeat_times: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'how many times should the schedule repeat'
    },
    schedule_start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    skip_holidays: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, { paranoid: true });
module.exports = schedules;