const Controllers = require("../models/control");

module.exports = {
    index: async (req, res) => {
        res.render('superadmin/session/index', { layout: false });
    },
    list: async (req, res) => {

        const control = await new Controllers(req);
        // (await control.getCurrentSession()).userId
        let data = await (await control.find()).sessions();
        console.log(data);
        res.render('superadmin/session/list', { layout: false, sessions: data });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        // (await control.getCurrentSession()).userId
        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/session/create', { layout: false });
        } else {
            if (req.method == 'POST' && rreq.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.create()).session(data);
                    res.json({ status: true, notification: 'successfully added session!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add session: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let session = await (await control.single()).session(req.params.id)
            res.render('superadmin/session/edit', { layout: false, session: session });
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).session(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated session!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update session: ' + err.message })
                }
            }
        }

    },

    activateSession: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let oldSession = JSON.parse(JSON.stringify(await (await control.findBy()).session({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await (await control.update()).session(oldSession[0].id, { status: 0 });
            }
            await (await control.update()).session(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated session!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate session: ' + err.message })
        }

    }
}