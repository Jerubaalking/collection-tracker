const { spawnJwtPayload } = require("../services/handlers");
const Controllers = require("../models/control");
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/deductions/index', { layout: false });
    },
    list: async (req, res) => {
        try {

            const control = new Controllers(req);
            let data = await (await control.find()).deductions();
            res.render('superadmin/deductions/list', { layout: false, deductions: data });
        } catch (err) {
            if (err.message == 'user not authenticated!') {
                res.redirect('/');
            }
        }
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/deductions/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:12121');
                    let data = req.body;
                    await (await new Controllers(req).create()).deduction(data);
                    res.json({ status: true, notification: 'successfully added deduction!' })
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to add deduction: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let deduction = await (await new Controllers(req).single()).deduction(req.params.id)
            res.render('superadmin/deductions/edit', { layout: false, deduction: JSON.parse(JSON.stringify(deduction)) });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).deduction(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated deduction!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update deduction: ' + err.message })
                }
            }
        }

    },

    activateSession: async (req, res) => {
        try {
            const control = await new Controllers(req);
            let oldSession = JSON.parse(JSON.stringify(await (await control.findBy()).deduction({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await (await control.update()).deduction(oldSession[0].id, { status: 0 });
            }
            await (await control.update()).deduction(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated deduction!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate deduction: ' + err.message })
        }

    }
}