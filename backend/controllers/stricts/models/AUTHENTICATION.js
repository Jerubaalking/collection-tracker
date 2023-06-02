const { Model, DataTypes, UUIDV4 } = require("sequelize");
const { sequelize } = require("../../../../database/mysql");
const { passwordHash, passwordHashVerify } = require("../../services/service");
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    class Authentication extends Model {
        static associate(models) {
            /** associations here */
        }
    };
    Authentication.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
        },

        hash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        salt: {
            type: DataTypes.STRING,
            unique: true
        },
        iterations: DataTypes.INTEGER,
        remember_token: DataTypes.STRING,
        authentication_key: {
            type: DataTypes.STRING,
        },
    }, {
        hooks: {
            beforeCreate: async (Authentication) => {
                let _hash = await passwordHash(Authentication.password);
                Authentication.hash = _hash.hashHex;
                Authentication.salt = _hash.salt;
                Authentication.iterations = _hash.iterations;
                let iv = crypto.randomBytes(16);
                Authentication.authentication_key = crypto.randomBytes(32);
                let cypher = crypto.createCipheriv('aes-256-cbc', Buffer.from(Authentication.authentication_key), iv);
                let encrypted = cypher.update(Authentication.password);
                encrypted = Buffer.concat([encrypted, cypher.final()]);
                Authentication.remember_token = iv.toString('hex');
                Authentication.password = encrypted.toString('hex');
            }
        },
        sequelize,
        paranoid: true,
        modelName: 'Authentication'
    });
    Authentication.prototype.validatePassword = async (password) => {
        return await passwordHashVerify(password, this.salt, this.hash);
    }
    Authentication.prototype.encrypt = (password) => {
        let iv = crypto.randomBytes(16);
        let key = crypto.randomBytes(32);
        let cypher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cypher.update(password);
        encrypted = Buffer.concat([encrypted, cypher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), key: key.toString('hex') };
    };
    Authentication.prototype.decrypt = () => {
        let iv = Buffer.from(this.Authentication.remember_token, 'hex');
        let encryptedText = Buffer.from(this.Authentication.password, 'hex');
        let decypher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.Authentication.authentication_key), iv);
        let dencrypted = decypher.update(encryptedText);
        dencrypted = Buffer.concat([dencrypted, decypher.final()]);
        return dencrypted.toString('hex');
    };
    return Authentication;
}