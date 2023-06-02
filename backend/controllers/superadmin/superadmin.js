const update = require("../models/updates");
const creates = require("../models/creates");
const finds = require("../models/finds");
const single = require("../models/single");
const findby = require("../models/findBy");
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
const { businesses, users} = require("../../../database/models/module_exporter");
let _many_module = 'businesses';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/superadmin/index', { layout: false });
    },
    list: async (req, res) => {

        let admins = await (await new Controllers(req).findBy()).user({ where: { [Op.or]: [{ role: "superadmin" }] }, include: [{ model: businesses }] });
        if (admins.status) {
            res.render('superadmin/superadmin/list', { layout: false, superadmins: admins.data, message: admins.notification });
        } else {
            res.render('superadmin/superadmin/list', { layout: false, superadmins: admins.data, message: admins.notification });
        }
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            let businesses = await (await new Controllers(req).find()).businesses();
            res.render('superadmin/superadmin/create', { layout: false, businesses: JSON.parse(JSON.stringify(businesses)) });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    data.role = 'superadmin';
                    await (await new Controllers(req).create()).user(data);
                    res.json({ status: true, notification: 'successfully added admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let admin = await single.user(req.params.id);
            let businesses = await (await new Controllers(req).find()).businesses();
            res.render('superadmin/superadmin/edit', { layout: false, admin: JSON.parse(JSON.stringify(admin)), businesses: JSON.parse(JSON.stringify(businesses)) });
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await update.user(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update admin: ' + err.message })
                }
            }
        }

    },

    activateSession: async (req, res) => {
        try {
            let oldSession = JSON.parse(JSON.stringify(await findby.admin({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await update.admin(oldSession[0].id, { status: 0 });
            }
            await update.admin(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated admin!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    }
}