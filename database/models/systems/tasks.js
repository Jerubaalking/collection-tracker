const { Model, Sequelize, sequelize } = require("../../mysql");
class tasks extends Model { };
tasks = sequelize.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriptions: {
        type: Sequelize.STRING
    }
}, { paranoid: true });
module.exports = tasks;
/** Tasks need to be scheduled
 * every after the schedule time is reached then the task is create
 * there have to be defined tasks and their durations
 */