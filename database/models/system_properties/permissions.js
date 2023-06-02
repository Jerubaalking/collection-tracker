const { Model, Sequelize, sequelize } = require("../../mysql");
class permissions extends Model { };
permissions = sequelize.define('permissions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriptions: {
        type: Sequelize.STRING,
    }
}, { paranoid: true });
module.exports = permissions;
