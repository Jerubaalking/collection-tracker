const { Model, Sequelize, sequelize } = require("../../mysql");

class settings extends Model { };

settings = sequelize.define('settings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    system_name: Sequelize.STRING,
    system_title: Sequelize.STRING,
    system_email: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    system_currency: Sequelize.STRING,
    purchase_code: Sequelize.STRING,
    currency_position: Sequelize.STRING,
    running_session: Sequelize.STRING,
    language: Sequelize.STRING,
    paypal_active: Sequelize.STRING,
    paypal_mode: Sequelize.STRING,
    stripe_active: Sequelize.STRING,
    stripe_mode: Sequelize.STRING,
    stripe_test_secret_key: Sequelize.STRING,
    stripe_test_public_key: Sequelize.STRING,
    stripe_live_secret_key: Sequelize.STRING,
    stripe_live_public_key: Sequelize.STRING,
    stripe_currency: Sequelize.STRING,
    student_email_verification: Sequelize.STRING,
    footer_text: Sequelize.STRING,
    footer_link: Sequelize.STRING,
    version: Sequelize.STRING,
    fax: Sequelize.STRING,
    date_of_last_update_attendance: Sequelize.STRING,
    timezone: Sequelize.STRING,
});
module.exports = settings;