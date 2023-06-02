'use strict'
const users = require('../systems/users')
const languages = require('../systems/languages');
const { Model, sequelize, DataTypes } = require('../../mysql');
class user_languages extends Model { };
user_languages = sequelize.define('user_languages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});

users.belongsToMany(languages, { through: user_languages });
languages.belongsToMany(users, { through: user_languages });

const hooks = {
    afterCreate: (user, payload) => {
        AddUserLanguage(user, payload);
    }
}

function AddUserLanguage(user, payload) {
    let InsertArr = {
        userId: user.id,
        languageId: 1
    }
    model.user_language.create(InsertArr);
}
module.exports = { hooks, user_languages };