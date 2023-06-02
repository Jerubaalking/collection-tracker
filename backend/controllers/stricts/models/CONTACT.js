const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../../database/mysql");

module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        // static associate(models) {
        //     /** associations here */
        //     Contact.belongsTo(models);
        //     models.hasMany(Contact);
        // }
    };
    Contact.init({
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