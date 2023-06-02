const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../../database/mysql");

module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        // static associate(models) {
        //     /** associations here */
        //     Session.belongsTo(models);
        //     models.hasMany(Session);
        // }
    };
    Session.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, { hooks: {}, paranoid: true, sequelize });
}