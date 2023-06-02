const { Model, Sequelize, sequelize } = require("../../mysql");
class uploads extends Model { };
uploads = sequelize.define('uploads', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    fieldname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mimetype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    originalname: {
        type: Sequelize.STRING,
    },
    watermark: {
        type: Sequelize.STRING,
        defaultValue: 'saincraft'
    }
}, { paranoid: true });
module.exports = uploads;