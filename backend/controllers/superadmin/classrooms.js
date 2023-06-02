
const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const sections = require("../../../database/models/sections");
const Controllers = require("../models/control");
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/classrooms/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let classrooms = await (await control.findBy()).classroom({ where: { schoolId: (await control.getCurrentSession()).schoolId } });
        res.render('superadmin/classrooms/list', { layout: false, classrooms: classrooms });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/classrooms/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    const control = await new Controllers(req);
                    data.schoolId = await (await control.getCurrentSession()).schoolId;
                    await (await control.create()).classroom(data);
                    res.json({ status: true, notification: 'successfully added classroom!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add classroom: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let classroom = await (await new Controllers(req).single()).classroom(req.params.id);
            res.render('superadmin/classrooms/edit', { layout: false, classroom: classroom });
            return;
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).classroom(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated classroom!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update classroom: ' + err.message })
                }
            }
        }
        return;

    },

    classSection: async (req, res) => {
        try {
            let ans = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).section({ where: { classId: 1 } })));
            console.log('ans', await ans, req.url);
            res.render('superadmin/classrooms/listByClassOptions', { layout: false, classrooms: await ans })
        } catch (err) {
            // res.render('superadmin/classrooms/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },

    sections: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/sections')) {
            try {
                const control = await new Controllers(req);
                let _class = await (await control.single()).class(req.params.id);
                let ccl = await JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: _class.id } })));
                _class['sections'] = ccl;
                let count = ccl.length;

                console.log(_class);
                res.render('superadmin/classrooms/sections', { layout: false, class: _class, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load sections: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/sections')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers().update()).section(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated class sections!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update class sections: ' + err.message })
                }
            }
        }
    },
}