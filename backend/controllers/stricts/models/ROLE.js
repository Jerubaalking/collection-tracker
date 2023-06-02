const { Model, DataTypes, UUIDV4 } = require("sequelize");
const { sequelize } = require("../../../../database/mysql");

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            /** associations here */
            // Role.belongsTo(models);
            // models.hasMany(Role);
        }
    };
    Role.init({
        id: {
            type: Sequelize.STRING,
            defaultValue: UUIDV4,
            primaryKey: true,
            unique: true,
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: 'generic',
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        }
    }, { hooks: {}, paranoid: true, sequelize });
    return Role;
}