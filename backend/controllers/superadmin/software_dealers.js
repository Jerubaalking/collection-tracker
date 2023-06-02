const update = require("../models/updates");
const creates = require("../models/creates");
const finds = require("../models/finds");
const single = require("../models/single");
const findby = require("../models/findBy");
const { Op } = require("../../../database/mysql");
const { businesses, users, roles } = require("../../../database/models/module_exporter");
const Controllers = require("../models/control");
let _many_module = 'businesses';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/software_dealers/index', { layout: false });
    },
    list: async (req, res) => {

        let clients = await (await new Controllers(req).findBy()).client({ include: [{ model: users, include: { model: roles } }, { model: businesses }] });
        console.log(await clients);
        // if (clients[0].users) {
        //     res.render('superadmin/software_dealers/list', { layout: false, admins: clients[0].users, message: "success!" });
        // } else {
        res.render('superadmin/software_dealers/list', { layout: false, clients: clients.rows, message: "success!" });
        // }
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            let businesses = await (await new Controllers(req).find()).businesses();
            res.render('superadmin/software_dealers/create', { layout: false, businesses: JSON.parse(JSON.stringify(businesses)) });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    data.role = 'admin';
                    console.log('data from reqbody', data);
                    let client = await (await new Controllers(req).create()).client(data);
                    await res.json({ status: true, notification: 'successfully added admin!', data: await client })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let client = await (await new Controllers(req).single()).client(req.params.id);
            let businesses = await (await new Controllers(req).find()).businesses();
            console.log(client);
            res.render('superadmin/software_dealers/edit', { layout: false, client: JSON.parse(JSON.stringify(client)), businesses: JSON.parse(JSON.stringify(businesses)) });
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