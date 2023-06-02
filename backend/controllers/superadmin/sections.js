const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const Controllers = require("../models/control");
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/sections/index', { layout: false });
    },
    list: async (req, res) => {

        let students = await (await new Controllers(req).findBy()).student({ where: { schoolId: 1, include: [{ model: users }] } });

        console.log(admins);
        res.render('superadmin/sections/list', { layout: false, students: JSON.parse(JSON.stringify(students)) });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            let schools = await (await new Controllers(req).find()).schools();
            res.render('superadmin/sections/create', { layout: false, schools: JSON.parse(JSON.stringify(schools)) });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await creates.user(data);
                    res.json({ status: true, notification: 'successfully added admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let admin = await (await new Controllers(req).single()).user(req.params.id);
            let schools = await (await new Controllers(req).find()).schools();
            res.render('superadmin/sections/edit', { layout: false, admin: JSON.parse(JSON.stringify(admin)), schools: JSON.parse(JSON.stringify(schools)) });
            return;
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).user(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated admin!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update admin: ' + err.message })
                }
            }
        }
        return;

    },

    classSection: async (req, res) => {
        try {
            let ans = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).section({ where: { classId: 1 } })));
            console.log('ans', await ans, req.url);
            res.render('superadmin/sections/listByClassOptions', { layout: false, sections: await ans })
        } catch (err) {
            // res.render('superadmin/sections/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    }
}