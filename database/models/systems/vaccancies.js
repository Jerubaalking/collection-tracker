const { Model, Sequelize, sequelize } = require("../../mysql");
class vaccancies extends Model { };
vaccancies = sequelize.define('vaccancies', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    job_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, { paranoid: true });

module.exports = vaccancies;