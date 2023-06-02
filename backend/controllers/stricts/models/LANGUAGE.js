const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../../database/mysql");

module.exports = (sequelize, DataTypes) => {
    class Language extends Model {
        // static associate(models) {
        //     /** associations here */
        //     Language.belongsTo(models);
        //     models.hasMany(Language);
        // }
    };
    Language.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: UUIDV4,
            primaryKey: true,
            unique: true
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        }
    }, { hooks: {}, paranoid: true, sequelize });
}