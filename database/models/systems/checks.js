const { Model, Sequelize, sequelize } = require("../../mysql");
class check_requests extends Model { };
check_requests = sequelize.define('checks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});

module.exports = check_requests;