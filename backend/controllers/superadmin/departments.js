// const stores = require("../../../database/models/stores/stores");
const Controllers = require("../models/control");

module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/departments/index', { layout: false });
    },
    /**
     * 
     * @param {http-request} http-request 
     * @param {http-response} http-response 
     */
    list: async (req, res) => {

        let data = await (await new Controllers(req).findBy()).department({ where: {}, include: { model: stores } });
        console.log(data);
        res.render('superadmin/departments/list', { layout: false, departments: data });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            let data = await (await new Controllers(req).find()).stores();
            res.render('superadmin/departments/create', { layout: false, stores: data });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).create()).department(data);
                    res.json({ status: true, notification: 'successfully added department!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add department: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            console.log(req.params);
            let department = await (await new Controllers(req).single()).department(req.params.id)
            res.render('superadmin/departments/edit', { layout: false, department: department });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).department(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated department!' })
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to update department: ' + err.message })
                }
            }
        }

    },

    activateSession: async (req, res) => {
        try {
            let oldSession = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).department({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await (await new Controllers(req).update()).department(oldSession[0].id, { status: 0 });
            }
            await (await new Controllers(req).update()).department(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated department!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate department: ' + err.message })
        }

    }
}