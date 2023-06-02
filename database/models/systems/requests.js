const { Model, Sequelize, sequelize } = require("../../mysql");
const currencies = require("./currencies");
class requests extends Model { };
requests = sequelize.define('requests', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
    }
}, { paranoid: false });
requests.belongsTo(currencies);
currencies.hasMany(requests);
module.exports = requests;