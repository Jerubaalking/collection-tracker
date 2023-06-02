const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../../database/mysql");

module.exports = (sequelize, DataTypes) => {
    class upload extends Model { };
    upload.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            fieldname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mimetype: {
                type: DataTypes.STRING,
                allowNull: false
            },
            originalname: {
                type: DataTypes.STRING,
            },
            watermark: {
                type: DataTypes.STRING,
                defaultValue: 'saincraft'
            }
        },
        {
            hooks: {},
            paranoid: true,
            sequelize,
            modelName: 'upload'
        }
    );
}