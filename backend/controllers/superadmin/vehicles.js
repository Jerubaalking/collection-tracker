const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const sections = require("../../../database/models/sections");
const Controllers = require("../models/control");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/vehicles/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let vehicles = JSON.parse(JSON.stringify(await (await control.findBy()).vehicle({ where: { schoolId: await (await control.getCurrentSession()).schoolId } })));

        res.render('superadmin/vehicles/list', { layout: false, vehicles: vehicles });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/vehicles/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.create()).vehicle(data);
                    res.json({ status: true, notification: 'successfully added vehicle!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add vehicle: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let vehicle = await (await control.single()).vehicle(req.params.id);
            res.render('superadmin/vehicles/edit', { layout: false, vehicle: JSON.parse(JSON.stringify(await vehicle)) });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).vehicle(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated vehicle!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update vehicle: ' + err.message })
                }
            }
        }
        return;

    },

    classSection: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let ans = JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: 1 } })));
            console.log('ans', await ans, req.url);
            res.render('superadmin/vehicles/listByClassOptions', { layout: false, vehicles: await ans })
        } catch (err) {
            // res.render('superadmin/vehicles/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },

    sections: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/sections')) {
            try {

                let _class = await (await control.single()).class(req.params.id);
                let ccl = await JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: _class.id } })));
                _class['sections'] = ccl;
                let count = ccl.length;

                console.log(_class);
                res.render('superadmin/vehicles/sections', { layout: false, class: _class, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load sections: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/sections')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).section(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated class sections!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update class sections: ' + err.message })
                }
            }
        }
    },
}