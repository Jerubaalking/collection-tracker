
// const item_categories = require("../../../database/models/item_categories");
// const niches = require("../../../database/models/niches");
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
let _many_module = 'businesses';
let _single_module = 'business';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/item_categories/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let cl = JSON.parse(JSON.stringify(await (await control.findBy()).item_categories({ include: { model: niches } })));

        // for (const _class of cl) {
        //     let ccl = await JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: _class.id } })));
        //     _class['sections'] = ccl;
        //     item_categories.push(_class);
        // }

        // console.log(item_categories);
        res.render('superadmin/item_categories/list', { layout: false, item_categories: cl });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            const control = await new Controllers(req);
            let niches = await (await control.findBy()).niches({ where: {} });

            res.render('superadmin/item_categories/create', { layout: false, niches: await niches });
        } else {
            console.log('its post:');
            const control = await new Controllers(req);
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    await (await control.create()).item_category(req.body);
                    res.json({ status: true, notification: 'successfully added item category!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add item category: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            const control = await new Controllers(req);
            let category = await (await control.single()).item_categories({ where: { id: req.params.id }, include: { model: niches } });
            let nichez = await (await control.findBy()).niches();
            console.log(niches);
            res.render('superadmin/item_categories/edit', { layout: false, category: category, niches: await nichez });
            return;
        } else {
            if (req.method == 'POST') {
                try {
                    let data = req.body;
                    console.log('its post:', data);
                    await (await new Controllers(req).update()).item_category(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated categories!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update categories: ' + err.message })
                }
            }
        }
        return;

    },

    delete: async (req, res) => {
        if (req.method == 'DELETE') {
            await item_categories.destroy({ where: { id: req.params.id } });
            res.status(200).json({ status: true, notification: "successfully deleted category!" });
        } else {
            res.status(203).json({ status: false, notification: "not allowed!" });
        }
    }
}