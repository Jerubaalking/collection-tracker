const { Model, DataTypes, sequelize } = require("../../mysql");
const languages = require("../systems/languages");
class translations extends Model { };
translations = sequelize.define('translations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phrase: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    translation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
translations.belongsTo(languages);
languages.hasMany(translations);
module.exports = translations;