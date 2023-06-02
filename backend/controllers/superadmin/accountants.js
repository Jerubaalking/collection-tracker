
const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const fs = require('fs');
const { enrols } = require("../models/updates");
const Controllers = require("../models/control");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        let classes = await (await new Controllers(req).find()).classes();
        console.log('req', req.url);
        let main = JSON.parse(JSON.stringify(await (await new Controllers(req).find()).main_menus()));
        let sub = JSON.parse(JSON.stringify(await (await new Controllers(req).find()).sub_menus()));
        res.render('superadmin/accountants/index', { layout: false, menus: main, sub_menu: sub, classes: JSON.parse(JSON.stringify(await classes)) });
    },
    list: async (req, res) => {

        let accountants = await (await new Controllers(req).findBy()).user({ where: { schoolId: 1, role: 'accountant' } });
        res.render('superadmin/accountants/list', { layout: false, accountants: JSON.parse(JSON.stringify(accountants)) });
    },

    profile: async (req, res) => {

        let accountants = await (await new Controllers(req).single()).enrols(req.params.id);
        console.log(accountants);
        res.render('superadmin/accountants/profile', { layout: false, enrol: JSON.parse(JSON.stringify(accountants)) });
    },


    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            // let schools = await (await new Controllers(req).find()).schools();
            res.render('superadmin/accountants/create.hbs', { layout: false, });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {

                    let data = req.body;
                    await (await new Controllers(req).create()).accountant(data);
                    console.log('its post single:');
                    res.json({ status: true, notification: 'successfully added accountant' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add accountant: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let schools = JSON.parse(JSON.stringify(await (await new Controllers(req).find()).schools()));
            let accountant = JSON.parse(JSON.stringify(await (await new Controllers(req).single()).user(req.params.id)));
            console.log(accountant);
            res.render('superadmin/accountants/edit', { layout: false, accountant: JSON.parse(JSON.stringify(accountant)) });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    let accountant = JSON.parse(JSON.stringify(await (await new Controllers(req).single()).user(req.params.id)));
                    await (await new Controllers(req).update()).user(accountant.id, data);
                    res.json({ status: true, notification: 'successfully updated accountant!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update accountant: ' + err.message })
                }
            }
        }

    },

    classSection: async (req, res) => {
        try {
            let accountantz = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).enrol({ where: { classId: req.params.class, sectionId: req.params.section, schoolId: 1 }, include: [{ model: accountants, include: { model: users, nested: false } }] })));
            console.log('accountant list->', accountantz);
            res.render('superadmin/accountants/list', { layout: false, accountants: accountantz });
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    }
}