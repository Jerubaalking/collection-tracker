
// const niches = require("../../../database/models/niches");
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
let _many_module = 'businesses';
let _single_module = 'business';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/niches/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let cl = JSON.parse(JSON.stringify(await (await control.findBy()).niches()));
        let niches = [];
        // for (const _class of cl) {
        //     let ccl = await JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: _class.id } })));
        //     _class['sections'] = ccl;
        //     niches.push(_class);
        // }

        // console.log(niches);
        res.render('superadmin/niches/list', { layout: false, niches: cl });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/niches/create', { layout: false });
        } else {
            console.log('its post:');
            const control = await new Controllers(req);
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    await (await control.create()).niche(req.body);
                    res.json({ status: true, notification: 'successfully added niche!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add niche: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            const control = await new Controllers(req);
            let niche = await (await control.single()).niche(req.params.id);
            res.render('superadmin/niches/edit', { layout: false, niche: niche });
            return;
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).niche(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated niche!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update niche: ' + err.message })
                }
            }
        }
        return;

    },
    delete: async (req, res) => {
        if (req.method == 'DELETE') {
            await niches.destroy({ where: { id: req.params.id } });
            res.status(200).json({ status: true, notification: "successfully deleted niche!" });
        } else {
            res.status(203).json({ status: false, notification: "not allowed!" });
        }
    }

}