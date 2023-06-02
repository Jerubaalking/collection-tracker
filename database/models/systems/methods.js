const { Model, Sequelize, sequelize } = require("../../mysql");
const uploads = require("../system_properties/uploads");
class methods extends Model { };
methods = sequelize.define('methods', {
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
    facilitator: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:'Saincraft technologies'
    },
    descriptions: {
        type: Sequelize.STRING
    }
}, { paranoid: true });
methods.belongsTo(uploads);
uploads.hasMany(methods)
module.exports = methods;