const update = require("../models/updates");
const creates = require("../models/creates");
const finds = require("../models/finds");
const single = require("../models/single");
const findby = require("../models/findBy");
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
let _many_module = 'currencies';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/currencies/index', { layout: false });
    },
    list: async (req, res) => {

        let currencies = await (await new Controllers(req).findBy()).currency({});
        console.log('currency>>>>>>>>>:', currencies);
        res.render('superadmin/currencies/list', { layout: false, currencies: currencies });

    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/currencies/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {

                    let data = req.body;
                    console.log(data);
                    (data.vodacom_supported != null) ? data.vodacom_supported : data.vodacom_supported = 0;
                    (data.tigo_supported != null) ? data.tigo_supported : data.tigo_supported = 0;
                    (data.airtel_supported != null) ? data.airtel_supported : data.airtel_supported = 0;
                    (data.stripe_supported != null) ? data.stripe_supported : data.stripe_supported = 0;
                    (data.safaricom_supported != null) ? data.safaricom_supported : data.safaricom_supported = 0;
                    (data.paypal_supported != null) ? data.paypal_supported : data.paypal_supported = 0;

                    console.log('its post:', data);
                    await (await new Controllers(req).create()).currency(data);
                    res.json({ status: true, notification: 'successfully added currency!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add currency: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let currency = await (await new Controllers(req).single()).currency(req.params.id);
            console.log(currency);
            res.render('superadmin/currencies/edit', { layout: false, currency: JSON.parse(JSON.stringify(currency)) });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit' + req.params.id)) {
                try {
                    console.log('its post:');

                    console.log('its post:', data);
                    await (await new Controllers(req).update()).currency(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated currency!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update currency: ' + err.message })
                }
            }
        }

    },

    activateSession: async (req, res) => {
        try {
            let oldSession = JSON.parse(JSON.stringify(await findby.currency({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await update.currency(oldSession[0].id, { status: 0 });
            }
            await update.currency(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated currency!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate currency: ' + err.message })
        }

    }
}