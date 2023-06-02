const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const countries = require("./countries");
class currencies extends Model { };
currencies = sequelize.define('currencies', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: { type: DataTypes.STRING, },
    code: { type: DataTypes.STRING, },
    symbol: { type: DataTypes.STRING, },
});
currencies.belongsTo(countries);
countries.hasMany(currencies);
module.exports = currencies;