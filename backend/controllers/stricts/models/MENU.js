const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../../database/mysql");

module.exports = (sequelize, DataTypes) => {
    class Menu extends Model {
        // static associate(models) {
        //     /** associations here */
        //     Menu.belongsTo(models);
        //     models.hasMany(Menu);
        // }
    };
    Menu.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        display_name: DataTypes.STRING,
        route_name: DataTypes.STRING,
        parent: DataTypes.INTEGER,
        icon: DataTypes.STRING,
        sort_order: {
            type: DataTypes.INTEGER
        },
        is_addon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: 'if the value is 1 that means its addon'
        },
        unique_identifier: {
            type: DataTypes.INTEGER,
            comment: 'its mandatory for addon'
        }
    }, { hooks: {}, paranoid: true, sequelize });
}