const { sequelize, DataTypes, Model } = require("../../mysql");
const users = require('../systems/users')
const roles = require('../systems/roles')
class user_roles extends Model { }
user_roles = sequelize.define('user_roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
}, {
    paranoid: true
});
users.belongsToMany(roles, { through: user_roles });
roles.belongsToMany(users, { through: user_roles });
user_roles.belongsTo(users);
user_roles.belongsTo(roles);
users.hasMany(user_roles);
roles.hasMany(user_roles);

const hooks = {
    afterCreate: (user, payload) => {
        AddUserRole(user, payload);
    }
}

module.exports = { hooks, user_roles }