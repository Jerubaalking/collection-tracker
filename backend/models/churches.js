const { sequelize, Sequelize } = require("../../database/mysql");

module.exports = (sequelize, Sequelize)=>{
    const Churches = sequelize.define('churches', {
        name: {
          type: Sequelize.STRING,
        },
        logo: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        phone: {
          type: Sequelize.STRING,
        },
        website: {
          type: Sequelize.STRING,
        },
        registration: {
          type: Sequelize.STRING,
          unique: true
        }
      }, { paranoid: true });

      Churches.associate = (model)=>{
        Churches.belongsToMany(model.Users, { through: 'church_users', foreignKey: 'churchId'});
      }
}