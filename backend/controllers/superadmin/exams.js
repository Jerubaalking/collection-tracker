const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const sections = require("../../../database/models/sections");
const Controllers = require("../models/control");

module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/exams/index', { layout: false });
    },
    list: async (req, res) => {
        let c = await new Controllers(req);
        let ses = await c.getCurrentSession();
        let exams = JSON.parse(JSON.stringify(await (await c.findBy()).exam({ where: { schoolId: await ses.schoolId } })));

        res.render('superadmin/exams/list', { layout: false, exams: exams });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/exams/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).create()).exam(data);
                    res.json({ status: true, notification: 'successfully added exam!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add exam: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let exam = await (await new Controllers(req).single()).exam(req.params.id);
            res.render('superadmin/exams/edit', { layout: false, exam: exam });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).exam(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated exam!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update exam: ' + err.message })
                }
            }
        }
        return;
    },

    classSection: async (req, res) => {
        try {
            let ans = await (await new Controllers(req).findBy()).section({ where: { classId: 1 } });
            console.log('ans', await ans, req.url);
            res.render('superadmin/exams/listByClassOptions', { layout: false, exams: await ans })
        } catch (err) {
            // res.render('superadmin/exams/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },

    sections: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/sections')) {
            try {

                let _class = await (await new Controllers(req).single()).class(req.params.id);
                let ccl = await JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).section({ where: { classId: _class.id } })));
                _class['sections'] = ccl;
                let count = ccl.length;

                console.log(_class);
                res.render('superadmin/exams/sections', { layout: false, class: _class, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load sections: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/sections')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).section(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated class sections!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update class sections: ' + err.message })
                }
            }
        }
    },
}