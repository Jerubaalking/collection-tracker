const { Model, Sequelize, sequelize } = require("../../mysql");
class qualifications extends Model { };
qualifications = sequelize.define('qualifications', {
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
module.exports = qualifications;