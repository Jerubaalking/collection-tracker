
const LocalStrategy = require('passport-local').Strategy;
const { passwordHashVerify } = require('../backend/controllers/services/service');
const models = require('../database/models/module_exporter');

// const session = require('express-session');
// const SessionStore = require('session-file-store')(session);
// this.use(flash());
module.exports = {
    authenticateUser: async function (req, email, password, done) {
        // 
        try {
            email = email.trim();
            // console.log(await contact_authentications.findAll({ where: { id: { email: email } }, include: { model: contacts, include: { model: users } } }));
            const contact = JSON.parse(JSON.stringify(await models.contacts.findOne({ where: { email: email }, include: [{ model: models.authentications }, { model: models.users, include: [{ model: models.roles }, { model: models.languages }, { model: models.uploads }] }] })));
            console.log(await contact);
            const session = JSON.parse(JSON.stringify(await models.sessions.findOne({ where: { status: 1 } })));
            // const _user = JSON.parse(JSON.stringify(await user))[0];

            if (contact.users.length <= 0) {
                return done(null, false, { message: 'user do not exist!' });
            }
            const _user = await contact.users[0];
            let passVerify = await passwordHashVerify(password, contact.authentications[0].salt, contact.authentications[0].hash);
            if (_user.roles.length <= 0) {

            } else {

                console.log('...password verified!', await passVerify);
                if (passVerify) {
                    let userData = {
                        id: _user.id,
                        name: _user.name,
                        email: contact.email,
                        role: _user.roles[0],
                        userId: _user.id,
                        session: session.name,
                        sessionId: session.id,
                        language: _user.languages[0],
                        avatar: (_user.upload) ? _user.upload.path : null,
                        theme: 'light',
                        home: (_user.roles[0].role.includes('superadmin')) ? '/superadmin' : (_user.roles[0].role == 'admin') ? '/admin' : (_user.roles[0].role.includes('dealer')) ? '/dealer' : (_user.roles[0].role.includes('business')) ? '/business' : (_user.roles[0].role.includes('warehouse')) ? '/warehouse' : (_user.roles[0].role.includes('store')) ? '/store' : '/',
                    }
                    global.language = _user.languages[0];
                    console.log(userData);
                    return done(null, userData);
                } else {
                    return done(null, false, {
                        message: 'incorrect password!'
                    });
                };

            }
        } catch (err) {
            console.log(err);
            return done(null, false, {
                message: 'User dont exist!'
            });
        }
    },
    isLoggedIn: async (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                return next();
            } else {
                return res.redirect('/auth/signin');
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/auth/signin');
        }
    },
    notLoggedIn: async (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                // console.log("my request::", req.session.passport.user.role);
                switch (req.session.passport.user.role.role) {
                    case 'superadmin':
                        res.redirect('/superadmin');
                        break;
                    case 'admin':
                        res.redirect('/admin');
                        break;

                    case 'distributor':
                        res.redirect('/distributor');
                        break;
                    case 'client':
                        res.redirect('/client');
                        break;
                    default:
                        req.logOut(async (err) => {
                            if (!err) {
                                await next();
                            }
                        });
                        break;
                }
            } else {
                return next();
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/auth/signin');
        }
    }
} 
