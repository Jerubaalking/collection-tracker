const { UUIDV4 } = require("sequelize");
const { Model, sequelize, DataTypes } = require("../../mysql");
const uploads = require("../system_properties/uploads");
const languages = require("./languages");
// const uploads = require('../system_properties/uploads');
class users extends Model { };
users = sequelize.define('users', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique:true,
    },
    name: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
        allowNull: false,
        defaultValue: "MALE"
    },
    birthdate: DataTypes.DATE,
    status: {
        type: DataTypes.ENUM('none', 'verified', 'burned'),
        defaultValue: 'none'
    }
}, { paranoid: true });
/** associations */
users.belongsTo(uploads);
uploads.hasMany(users);
users.addHook('afterCreate', async (user) => {
    let lang = await languages.findOne({ where: { abbreviation: 'en' } });
    await lang.addUser(user);
});

module.exports = users;