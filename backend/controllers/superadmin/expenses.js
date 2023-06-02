const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const sections = require("../../../database/models/sections");
const Controllers = require("../models/control");
const expenses_categories = require("../../../database/models/expenses_categories");
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        let categories = await (await control.find()).expenses_categories();
        res.render('superadmin/expenses/index', { layout: false, categories: categories });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let dataArray = [...req.url.split('?')[1].split('&')];
        let data = {};
        dataArray.forEach(s => {
            data[s.split('=')[0]] = s.split('=')[1];
        });

        data = JSON.parse(JSON.stringify(data));

        console.log(data);
        console.log('log:::', req.params);
        let expensez = JSON.parse(JSON.stringify(await (await control.findBy()).expense({ where: { schoolId: await (await control.getCurrentSession()).schoolId, expensesCategoryId: data.categoryId, date: { [Op.between]: [data.start, data.end] } }, include: { model: expenses_categories } })));
        console.log('expense::', expensez);
        res.render('superadmin/expenses/list', { layout: false, expenses: expensez });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let categories = await (await control.find()).expenses_categories();
            res.render('superadmin/expenses/create', { layout: false, categories: categories });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.create()).expense(data);
                    res.json({ status: true, notification: 'successfully added expense!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add expense: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let category = await (await control.single()).expense(req.params.id);
            res.render('superadmin/expenses/edit', { layout: false, category: category });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).expense(req.params.id, data);
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
            res.render('superadmin/expenses/listByClassOptions', { layout: false, categories: await ans })
        } catch (err) {
            // res.render('superadmin/expenses/listByClassOptions', { layout: false, sessions: err.message })
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
                res.render('superadmin/expenses/sections', { layout: false, class: _class, count: count });
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