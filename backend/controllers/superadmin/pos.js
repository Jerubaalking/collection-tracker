const { Op } = require("../../../database/mysql");
const users = require("../../../database/models/users");
const Controllers = require("../models/control");
const item_categories = require("../../../database/models/item_categories");
const stockIns = require("../../../database/models/stockIns");
const stockOuts = require("../../../database/models/stockOuts");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/pos/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let items = await (await control.findBy()).item({ where: {}, include: [{ model: item_categories }, { model: stockIns }, { model: stockOuts }] });

        console.log(items);
        let data = [];
        for (const item of items.rows) {
            let available = 0.0;
            for (const stock of item.stock_ins) {
                available += parseFloat(stock.qty);
            }
            // console.log(...item.stock_outs);
            for (const out of item.stock_outs) {
                available -= parseFloat(out.qty);
            }
            item['available'] = available;
            data.push(item);
        }
        console.log(items);
        res.render('superadmin/pos/list', { layout: false, items: data });
    },
    sale: async (req, res) => {
        const control = await new Controllers(req);
        // let grades = await (await control.find()).grades();

        res.render('superadmin/pos/sale', { layout: false, grades: [] });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/pos/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    const control = await new Controllers(req);
                    let data = req.body;
                    data.schoolId = await (await control.getCurrentSession()).schoolId;
                    data.sessionId = await (await control.getCurrentSession()).sessionId;;
                    await (await control.create()).grade(data);
                    res.json({ status: true, notification: 'successfully added grade!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add grade: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let grade = await (await new Controllers(req).single()).grade(req.params.id);
            res.render('superadmin/pos/edit', { layout: false, grade: grade });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).grade(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated grade!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update grade: ' + err.message })
                }
            }
        }
        return;

    },

    classSection: async (req, res) => {
        try {
            let ans = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).section({ where: { classId: 1 } })));
            console.log('ans', await ans, req.url);
            res.render('superadmin/pos/listByClassOptions', { layout: false, grades: await ans })
        } catch (err) {
            // res.render('superadmin/pos/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },
    gradeOf: async (req, res) => {
        try {
            let ans = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).grade({ where: { schoolId: 1, marks_from: { [Op.lte]: req.params.grade }, marks_to: { [Op.gte]: req.params.grade } } })));
            console.log('ans', await ans, req.url);
            if (!ans.length <= 0) {
                res.send(ans[0].name)
            } else {

                res.send('#')
            }
        } catch (err) {
            // res.render('superadmin/pos/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },

    sections: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/sections')) {
            try {

                let _class = JSON.parse(JSON.stringify(await single.class(req.params.id)));
                let ccl = await JSON.parse(JSON.stringify(await findby.section({ where: { classId: _class.id } })));
                _class['sections'] = ccl;
                let count = ccl.length;

                console.log(_class);
                res.render('superadmin/pos/sections', { layout: false, class: _class, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load sections: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/sections')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await update.section(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated class sections!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update class sections: ' + err.message })
                }
            }
        }
    },
}