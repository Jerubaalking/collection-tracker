const update = require("../models/updates");
const creates = require("../models/creates");
const finds = require("../models/finds");
const single = require("../models/single");
const findby = require("../models/findBy");
const { Op } = require("../../../database/mysql");
const { users, roles, contacts, addresses, regions, countries, authentications } = require("../../../database/models/module_exporter");
const Controllers = require("../models/control");
const i18n = require("../../helpers/languages/i18n.config");
const uploads = require("../../../database/models/system_properties/uploads");
const fs = require('fs');
const path = require("path");
let _many_module = 'businesses';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/jobs/index', { layout: false, viewManager: req.session.passport.user });
    },
    list: async (req, res) => {

        let userz = await (await new Controllers(req).findBy()).user({ include: [{ model: roles }, { model: contacts }, { model: addresses, include: { model: regions, include: { model: countries } } }, { model: uploads }] });

        if (req.session.passport.user.role.role == 'admin') {

            let rolez = await (await new Controllers(req).findBy()).role({ where: { role: { [Op.not]: ['superadmin'] } }, include: [{ model: users, include: [{ model: roles }, { model: contacts }, { model: addresses, include: { model: regions, include: { model: countries } } }] }] });
            userz = [];
            for (const role of rolez) {
                for (const user of role.users) {
                    userz.push(user);
                }
            }
            console.log("user awaited!", await userz);
            return res.render('superadmin/jobs/list', { layout: false, users: await userz, message: "success!" });
        }
        console.log("user awaited!", userz.data[0].addresses);
        return res.render('superadmin/jobs/list', { layout: false, users: userz.data, message: "success!" });
    },
    create: async (req, res) => {
        if (req.method == 'GET' && req.url == '/create') {
            let roles = await (await new Controllers(req).findBy()).role({ where: { role: { [Op.not]: ['superadmin'] } } });
            let action = '/jobs/create'
            res.render('superadmin/jobs/user', { layout: false, roles: roles, action: action });
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
                    await (await new Controllers(req).create()).user(data);
                    res.json({ status: true, notification: i18n.__('successfully add') + ' ' + i18n.__('user') + '!' });

                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('user') + ': ' + err })

                }
            }
        }

    },

    upload: async (req, res) => {
        if (req.method == 'GET') {
            let user = JSON.parse(JSON.stringify(await users.findOne({ where: { id: req.params.id }, include: { model: uploads } })));
            let action = '/jobs/upload/' + req.params.id;
            res.render('superadmin/jobs/upload', { layout: false, user: await user, action: action });
        } else {
            if (req.method == 'POST') {
                try {
                    console.log(req);
                    if (req.file) {
                        // console.log(req.file);
                        let user = JSON.parse(JSON.stringify(await users.findOne({ where: { id: req.params.id }, include: { model: uploads } })));;
                        if (user.upload) {
                            await fs.unlinkSync(path.resolve(__dirname + '../../../../' + user.upload.path));
                            await uploads.update(req.file, { where: { id: user.upload.id } });
                            await users.update({ uploadId: await user.upload.id }, { where: { id: user.id } });
                            res.json({ status: true, notification: i18n.__('successfully updated') + ' ' + i18n.__('user') + ' image!' });
                        } else {
                            let upload = await uploads.build(req.file);
                            await upload.save();
                            await users.update({ uploadId: await upload.id }, { where: { id: req.params.id } });
                            res.json({ status: true, notification: i18n.__('successfully add') + ' ' + i18n.__('user') + ' image!' });
                        }
                        // await (await new Controllers(req).create()).user(data);
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
    address: async (req, res) => {
        if (req.method == 'GET') {
            let user = JSON.parse(JSON.stringify(await users.findOne({ where: { id: req.params.id }, include: [{ model: addresses, include: { model: regions, include: { model: countries } } }, { model: contacts }] })));
            let region = JSON.parse(JSON.stringify(await regions.findAll()));
            let action = '/jobs/address/' + req.params.id;
            res.render('superadmin/jobs/address', { layout: false, user: await user, action: action, regions: await region });
        } else {
            if (req.method == 'POST') {
                try {

                    let user = await users.findOne({ where: { id: req.params.id }, include: { model: addresses } });
                    let userr = JSON.parse(JSON.stringify(await user));
                    if (userr.addresses.length <= 0) {
                        // save if there is no user address
                        console.log('am here', req.body);
                        let address = await addresses.build(req.body);
                        await address.save();
                        await user.addAddress(await address);
                        res.json({ status: true, notification: i18n.__('successfully added') + ' ' + i18n.__('address') + '!' });
                    } else {
                        // update if there is user address
                        await addresses.update(req.body, { where: { id: userr.addresses[0].id } });
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
        if (req.method == 'GET') {
            let user = JSON.parse(JSON.stringify(await users.findOne({ where: { id: req.params.id }, include: [{ model: roles }, { model: contacts }] })));
            let action = { password: '/jobs/password/' + req.params.id };
            action['role'] = { role: '/jobs/password/role' + req.params.id };
            let role = JSON.parse(JSON.stringify(await roles.findAll()));
            console.log(await role);
            res.render('superadmin/jobs/password', { layout: false, user: await user, action: action, roles: await role, viewManager: req.session.passport.user });
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

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let user = JSON.parse(JSON.stringify(await users.findOne({ where: { id: req.params.id }, include: [{ model: uploads }, { model: contacts }] })));
            let action = '/jobs/edit/' + req.params.id;
            console.log(user);
            res.render('superadmin/jobs/user', { layout: false, user: user, action: action });
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