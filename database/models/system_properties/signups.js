const { Model, Sequelize, sequelize } = require("../../mysql");
class signups extends Model { };
signups = sequelize.define('signups', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    info_level: {
        type: Sequelize.ENUM('basic', 'required', 'full'),
        defaultValue: 'basic',
    },
    token: {
        type: Sequelize.STRING,
    },
    hash: {
        type: Sequelize.STRING,
    },
    has2factor: {
        type: Sequelize.BOOLEAN
    },
    ci_session: {
        type: Sequelize.TEXT
    },
    theme: {
        type: Sequelize.STRING,
    },
    locale: {
        type: Sequelize.STRING
    }
});

module.exports = signups;