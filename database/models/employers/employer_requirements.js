const { Model, Sequelize, sequelize } = require("../../mysql");
class requirements extends Model { };
requirements = sequelize.define('requirements', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: Sequelize.TEXT
    },
    descriptions: {
        type: Sequelize.TEXT,
    }
});

module.exports = requirements;