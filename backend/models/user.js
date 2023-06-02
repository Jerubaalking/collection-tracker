const { sequelize, Sequelize } = require("../../database/mysql");
const Churches = require('./churches');
const Users = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        unique: true
    },
    phone: {
        type: Sequelize.STRING,
        unique: true
    },
    birthdate: {
        type: Sequelize.DATE
    },
    avatar: {
        type: Sequelize.STRING,
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
}, { paranoid: true });
Users.associate = () => {
    Users.belongsToMany(Churches, { through: 'church_users', foreignKey: 'userId' });
}
module.exports = Users;