const { Model, DataTypes, UUIDV4 } = require("sequelize");
const uploads = require("../../../../database/models/system_properties/uploads");
const ROLE = require("./ROLE");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            /** associations here */
            User.belongsTo(uploads);
            uploads.hasMany(User);
        }
    };
    User.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
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
    }, {
        hooks: {
            afterCreate: (User) => {
                User.defautRole(User.id);
            }
        },
        paranoid: true,
        sequelize,
        modelName: 'User'
    });
    User.prototype.defautRole = async (User) => {
        let role = await ROLE(sequelize, DataTypes).findOne({ where: { role: 'generic' } });
        await role.addUser(await User);
    };
    User.prototype.updateRole = async (role, User) => {
        let _role = await ROLE(sequelize, DataTypes).findOne({ where: { role: role } });
        await User.updateRole(await _role);
    };
}