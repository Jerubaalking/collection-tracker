const { sequelize, DataTypes, Model } = require("../../mysql");
const users = require("../systems/users");
const signups = require('../system_properties/signups')
class user_signups extends Model { };
user_signups = sequelize.define('user_signups', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
}, { paranoid: true });
users.belongsToMany(signups, { through: user_signups });
signups.belongsToMany(users, { through: user_signups });

const hooks = {
    afterCreate: (User, payload) => {
        AddUserSignup(User, payload);
    }
}

// function AddUserSignup(User, payload) {
//     let InsertArr = {
//         userId: User.id,
//         signupId: 5
//     }
//     model.user_signup.create(InsertArr);
// }
module.exports = { hooks, user_signups };