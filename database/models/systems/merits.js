const { Model, DataTypes, sequelize, Sequelize } = require("../../mysql");
class merits extends Model { };
merits = sequelize.define('merits', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    merit: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('okay', 'good', 'better', 'best', 'excellent'),
        allowNull: false,
        defaultValue: 'okay',
        comment: 'how can you label the status of this merit'
    },
    effect_level: {
        type: DataTypes.ENUM('okay', 'low', 'medium', 'high', 'servere'),
        defaultValue: 'low',
        comment: 'what effect does it have on your business'
    }
});
module.exports = merits;