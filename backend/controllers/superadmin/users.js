const { Op } = require("../../../database/mysql");
const models = require("../../../database/models/module_exporter");
const Controllers = require("../controls/control");
const i18n = require("../../helpers/languages/i18n.config");
const fs = require('fs');
const path = require("path");
let _many_module = 'businesses';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/users/index', { layout: false, viewManager: req.session.passport.user });
    },
    list: async (req, res) => {
        const control = new Controllers(req);
        let userz = await (await control.find('users', { include: [{ model: models.roles }, { model: models.contacts }, { model: models.addresses, include: { model: models.regions, include: { model: models.countries } } }, { model: models.uploads }] }));

        if (req.session.passport.user.role.role == 'admin') {
            let rolez = await (await control.find('roles', { where: { role: { [Op.not]: ['superadmin'] } }, include: [{ model: models.users, include: [{ model: models.roles }, { model: models.contacts }, { model: models.addresses, include: { model: models.regions, include: { model: models.countries } } }] }] }));
            userz = [];
            for (const role of rolez) {
                for (const user of role.users) {
                    userz.push(user);
                }
            }
            return res.render('superadmin/users/list', { layout: false, users: await userz, message: "success!" });
        }
        return res.render('superadmin/users/list', { layout: false, users: userz, message: "success!" });
    },
    create: async (req, res) => {
        const control = new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let roles = await (await control.find('roles', { where: { role: { [Op.not]: ['superadmin'] } } }));
            let action = '/users/create'
            res.render('superadmin/users/user', { layout: false, roles: roles, action: action });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    // also request data for signups
                    data['ci_session'] = req.ip;
                    data['theme'] = 'default';
                    data['locale'] = 'TZ-sw';
                    data['has2factor'] = false;
                    data['theme'] = 'light';
                    console.log(data);
                    await (await control.create('users', data));
                    res.json({ status: true, notification: i18n.__('successfully add') + ' ' + i18n.__('user') + '!' });

                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('user') + ': ' + err })

                }
            }
        }

    },

    upload: async (req, res) => {
        const control = new Controllers(req);
        if (req.method == 'GET') {
            let user = await (await control.single('users', { where: { id: req.params.id }, include: { model: models.uploads } }));
            let action = '/users/upload/' + req.params.id;
            res.render('superadmin/users/upload', { layout: false, user: await user, action: action });
        } else {
            if (req.method == 'POST') {
                try {
                    const control = new Controllers(req);
                    if (req.file) {
                        let user = await (await control.single('users', { where: { id: req.params.id }, include: { model: models.uploads } }));;
                        if (user.upload) {
                            await fs.unlinkSync(path.resolve(__dirname + '../../../../' + user.upload.path));
                            await (await control.update('uploads', req.file, { where: { id: user.upload.id } }));
                            await (await control.update('users', { uploadId: await user.upload.id }, { where: { id: user.id } }));
                            res.json({ status: true, notification: i18n.__('successfully updated') + ' ' + i18n.__('user') + ' image!' });
                        } else {
                            let upload = await (await control.create('uploads', req.file));
                            await (await control.update('users', { uploadId: await upload.id }, { where: { id: req.params.id } }));
                            res.json({ status: true, notification: i18n.__('successfully add') + ' ' + i18n.__('user') + ' image!' });
                        }
                    }
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('user') + ': ' + i18n.__(err.message) + '\n' + err.original })

                }
            }
        }

    },
    address: async (req, res) => {
        const control = new Controllers(req);
        if (req.method == 'GET') {
            let user = await (await control.single('users', { where: { id: req.params.id }, include: [{ model: models.addresses, include: { model: models.regions, include: { model: models.countries } } }, { model: models.contacts }] }));
            let region = await (await control.find('regions'));
            let action = '/users/address/' + req.params.id;
            res.render('superadmin/users/address', { layout: false, user: await user, action: action, regions: await region });
        } else {
            if (req.method == 'POST') {
                try {

                    let user = await models.users.findOne({ where: { id: req.params.id }, include: { model: models.addresses } });
                    let userr = JSON.parse(JSON.stringify(await user));
                    if (userr.addresses.length <= 0) {
                        // save if there is no user address
                        console.log('am here', req.body);
                        let address = await models.addresses.build(req.body);
                        await address.save();
                        await user.addAddress(await address);
                        res.json({ status: true, notification: i18n.__('successfully added') + ' ' + i18n.__('address') + '!' });
                    } else {
                        // update if there is user address
                        await (await control.update('addresses', req.body, { where: { id: userr.addresses[0].id } }));
                        res.json({ status: true, notification: i18n.__('successfully added') + ' ' + i18n.__('address') + '!' });
                    }
                } catch (err) {
                    console.log(err);
                    // if ((err.original.toString()).split(' ').includes('Duplicate')) {
                    //     res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('user') + ': ' + i18n.__('duplicate entry') })
                    // } else {
                    //     res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('user') + ': ' + i18n.__(err.message) + '\n' + err.original })
                    // }
                    res.json({ status: false, notification: 'failed to add user address!', error: err.message });
                }
            }
        }
    },

    password: async (req, res) => {
        const control = new Controllers(req);
        if (req.method == 'GET') {
            let user = await (await control.single('users', { where: { id: req.params.id }, include: [{ model: models.roles }, { model: models.contacts }] }));
            let action = { password: '/users/password/' + req.params.id };
            action['role'] = { role: '/users/password/role' + req.params.id };
            let role = await (await control.find('roles'));
            console.log(await role);
            res.render('superadmin/users/password', { layout: false, user: await user, action: action, roles: await role, viewManager: req.session.passport.user });
        } else {
            if (req.method == 'POST') {
                try {
                    if (req.file) {
                        console.log(req.file);
                        // await (await new Controllers(req).create()).user(data);
                        res.json({ status: false, notification: i18n.__('successfully add') + ' ' + i18n.__('user') + '!' });
                    } else {
                        res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('user provide image') + '!' });
                    }
                } catch (err) {
                    console.log(err);
                    if ((err.original.toString()).split(' ').includes('Duplicate')) {
                        res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('user') + ': ' + i18n.__('duplicate entry') })
                    } else {
                        res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('user') + ': ' + i18n.__(err.message) + '\n' + err.original })
                    }
                }
            }
        }

    },
    edit: async (req, res) => {
        const control = new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let user = await (await control.single('users', { where: { id: req.params.id }, include: [{ model: models.uploads }, { model: models.contacts }] }));
            let action = '/users/edit/' + req.params.id;
            console.log(user);
            res.render('superadmin/users/user', { layout: false, user: user, action: action });
        } else {
            if (req.method == 'POST') {
                try {
                    let data = req.body;
                    // also request data for signups
                    let user = await users.findOne({ where: { id: req.params.id }, include: { model: contacts } });
                    let userr = await JSON.parse(JSON.stringify(await user));
                    console.log(userr);
                    if (userr.contacts.length <= 0) {
                        // add and contacts
                        let contact = await contacts.build(data);
                        await contact.save();
                        await user.addContact(await contact);
                    } else {
                        // update and contact
                        await contacts.update({ phone: data.phone, email: data.email }, { where: { id: userr.contacts[0].id } });


                    }
                    await users.update(data, { where: { id: userr.id } });
                    res.json({ status: true, notification: 'successfully updated user!' });
                } catch (err) {
                    res.json({ status: false, notification: i18n.__('failed to update') + ' ' + i18n.__('user') + ': ' + i18n.__(err.message) })
                }
            }
        }

    },

    verify_password: async (req, res) => {
        try {
            let token = await crypto.randomUUID();
            let user = await users.findOne({ where: { id: req.params.id }, include: [{ model: contacts, include: { model: authentications } }] });
            let userr = JSON.parse(JSON.stringify(await user));
            await authentications.update({ remember_token: token }, { where: { id: userr.contacts[0].authentications[0].id } });
            await contacts.update({ verified: false }, { where: { id: userr.contacts[0].id } });
            /** send email to client */

            /** after sending email to client response with success password reset email sent to client!*/

            let oldSession = JSON.parse(JSON.stringify(await findby.user({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await update.user(oldSession[0].id, { status: 0 });
            }
            await update.user(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated user!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate user: ' + err.message })
        }

    }
}