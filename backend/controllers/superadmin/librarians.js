
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
        // console.log('req', req.url);
        const control = await new Controllers(req);
        let librarians = JSON.parse(JSON.stringify(await (await control.find()).librarians()));
        res.render('superadmin/librarians/index', { layout: false, librarians: librarians });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);

        let librarians = await (await control.findBy()).user({ where: { schoolId: (await control.getCurrentSession()).schoolId, role: 'librarian' } });
        res.render('superadmin/librarians/list', { layout: false, librarians: JSON.parse(JSON.stringify(librarians)) });
    },

    profile: async (req, res) => {

        let librarians = await (await control.single()).enrols(req.params.id);
        console.log(librarians);
        res.render('superadmin/librarians/profile', { layout: false, enrol: JSON.parse(JSON.stringify(librarians)) });
    },


    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            // let schools = await finds.schools();
            res.render('superadmin/librarians/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {

                    const control = await new Controllers(req);
                    let data = req.body;
                    data.role = 'librarian';
                    await (await control.create()).user(data);
                    console.log('its post single library:');
                    res.json({ status: true, notification: 'successfully added librarian' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add librarian: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            const control = await new Controllers(req);
            let librarian = await (await control.single()).user(req.params.id);
            res.render('superadmin/librarians/edit', { layout: false, librarian: librarian });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    const control = await new Controllers(req);
                    console.log('its post:');
                    let data = req.body;
                    let librarian =await (await control.single()).user(req.params.id);
                    await update.user(librarian.id, data);
                    res.json({ status: true, notification: 'successfully updated librarian!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update librarian: ' + err.message })
                }
            }
        }

    },

    classSection: async (req, res) => {
        try {
            const control = await new Controllers(req);
            let librarianz = JSON.parse(JSON.stringify(await (await control.findBy()).enrol({ where: { classId: req.params.class, sectionId: req.params.section, schoolId: 1 }, include: [{ model: librarians, include: { model: users, nested: false } }] })));
            console.log('librarian list->', librarianz);
            res.render('superadmin/librarians/list', { layout: false, librarians: librarianz });
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    }
}