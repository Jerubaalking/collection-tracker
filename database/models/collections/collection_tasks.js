const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const tasks = require("../systems/tasks");
const collections = require("../systems/collections");
const schedules = require("../system_properties/schedules");
class collection_tasks extends Model { };
collection_tasks = sequelize.define('collection_tasks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
});
tasks.belongsToMany(collections, { through: collection_tasks });
collections.belongsToMany(tasks, { through: collection_tasks });
tasks.belongsTo(collection_tasks);
collection_tasks.hasMany(tasks);
collections.belongsTo(collection_tasks);
collection_tasks.hasMany(collections);

module.exports = collection_tasks;