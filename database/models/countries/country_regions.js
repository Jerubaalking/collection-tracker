const { Model, Sequelize, sequelize } = require("../../mysql");
const regions = require('../systems/regions');
const countries = require('../systems/countries');
class country_regions extends Model { };
country_regions = sequelize.define('country_regions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
regions.belongsToMany(countries, { through: country_regions });
countries.belongsToMany(regions, { through: country_regions });

module.exports = country_regions;