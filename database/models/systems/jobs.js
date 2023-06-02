const { Model, Sequelize, sequelize } = require("../../mysql");
class jobs extends Model { };
jobs = sequelize.define('jobs', {
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
    },
    deadline:{
        type:Sequelize.DATE,
    }
}, { paranoid: true });
module.exports = jobs;