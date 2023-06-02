const { Model, Sequelize, sequelize } = require("../../mysql");
class titles extends Model { };
titles = sequelize.define('titles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
});
module.exports = titles;