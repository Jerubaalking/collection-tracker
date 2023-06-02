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
        res.render('superadmin/expense_categories/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);

        let categories = JSON.parse(JSON.stringify(await (await control.findBy()).expenses_category({ where: { schoolId: await (await control.getCurrentSession()).schoolId } })));

        res.render('superadmin/expense_categories/list', { layout: false, categories: categories });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/categories/create') {
            res.render('superadmin/expense_categories/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/categories/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.create()).expenses_category(data);
                    res.json({ status: true, notification: 'successfully added expenses category!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add expenses category: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/categories/edit')) {
            let category = await (await control.single()).expenses_category(req.params.id);
            res.render('superadmin/expense_categories/edit', { layout: false, category: category });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/categories/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).expenses_category(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated expense category!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update expense category: ' + err.message })
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
            res.render('superadmin/expense_categories/listByClassOptions', { layout: false, categories: await ans })
        } catch (err) {
            // res.render('superadmin/expense_categories/listByClassOptions', { layout: false, sessions: err.message })
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
                res.render('superadmin/expense_categories/sections', { layout: false, class: _class, count: count });
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