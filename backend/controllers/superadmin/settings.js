const Controllers = require("../models/control");

let _many_module = 'settings';
let _single_module = 'setting';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/settings/index', { layout: false })
    },
    system: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/system')) {
            let data = await (await control.find()).settings()
            console.log(data);
            res.render('superadmin/settings/system_settings', { layout: false, settings: data });
        } else {
            if (req.method == 'POST' && req.url.includes('/system')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    let sett = await JSON.parse(JSON.stringify(await (await control.findBy()).setting({ where: { schoolId: 1 } })))
                    await (await control.update()).setting(sett[0].id, data);
                    res.json({ status: true, notification: 'successfully updated settings!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update settings: ' + err.message })
                }
            }
        }
    },
    smtp: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/smtp')) {
            let settings = await (await control.find()).smtp_settings()
            let data = await (await control.find()).smtp_settings()
            console.log(data);
            res.render('superadmin/settings/smtp_settings', { layout: false, smtp: data, settings: settings });
            return;
        } else {

            if (req.method == 'POST' && req.url.includes('/smtp/node_mailer')) {
                let smtpOld = await (await control.single()).smtp_setting({ where: { mail_sender: 'node_mailer' } });
                res.render('superadmin/settings/smtp_body', { layout: false, settings: smtpOld });
                return;
            }
            if (req.method == 'POST' && req.url.includes('/smtp/generic_smtp')) {

                let smtpOld = await (await control.single()).smtp_setting({ where: { mail_sender: 'generic_smtp' } });
                res.render('superadmin/settings/smtp_body', { layout: false, settings: smtpOld });
                return;
            }
            if (req.method == 'POST' && req.url.includes('/smtp')) {

                let smtpOld = await (await control.single()).smtp_setting({ where: { mail_sender: req.body.mail_sender } });

                if (smtpOld) {
                    let d = await (await control.update()).smtp_setting(smtpOld.id, req.body);
                    console.log(req.body, d);
                    res.json({ status: true, notification: 'successfully updated smtp settings' });
                } else {

                    let d = await (await control.create()).smtp_setting(req.body);
                    console.log(req.body, d);
                    res.json({ status: true, notification: 'successfully added smtp settings' });
                }
            }

        }
    },
    payment: async (req, res) => {
        const control = await new Controllers(req);
        let settings = await (await control.find()).settings()
        let data = await (await control.find()).smtp_settings()
        res.render('superadmin/settings/payment_settings', { layout: false, smtp: data, settings: settings });
    },

    school: async (req, res) => {
        const control = await new Controllers(req);
        let data = await (await control.find()).schools()
        console.log(data);
        res.render('superadmin/settings/school_settings', { layout: false, schools: data });
    },
    updateSMTP: async (req, res) => {
        const control = await new Controllers(req);
        if (smtpOld) {
            let d = await (await control.update()).smtp_setting(smtpOld.id, req.body);
            console.log(req.body, d);
            res.json({ status: true, notification: 'successfully updated smtp settings' });
        } else {

            let d = await (await control.create()).smtp_setting(req.body);
            console.log(req.body, d);
            res.json({ status: true, notification: 'successfully added smtp settings' });
        }
    }

}