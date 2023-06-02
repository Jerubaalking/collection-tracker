const { UUIDV4 } = require("sequelize");
const { Model, Sequelize, sequelize } = require("../../mysql");
const schedules = require("../system_properties/schedules");
const collections = require("../systems/collections");
class collection_schedules extends Model { };
collection_schedules = sequelize.define('collection_schedules', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },

});
schedules.belongsToMany(collections, { through: collection_schedules });
collections.belongsToMany(schedules, { through: collection_schedules });
schedules.belongsTo(collection_schedules);
collection_schedules.hasMany(schedules);
collections.belongsTo(collection_schedules);
collection_schedules.hasMany(collections);

module.exports = collection_schedules;