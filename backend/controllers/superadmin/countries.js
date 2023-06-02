const update = require("../models/updates");
const creates = require("../models/creates");
const finds = require("../models/finds");
const single = require("../models/single");
const findby = require("../models/findBy");
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
const currencies = require("../../../database/models/currencies");
let _many_module = 'countries';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/countries/index', { layout: false });
    },
    list: async (req, res) => {

        let countries = await (await new Controllers(req).findBy()).country({ include: [{ model: currencies }] });
        let currenciez = await (await new Controllers(req).findBy()).currency({});
        console.log('country>>>>>>>>>:', countries);
        res.render('superadmin/countries/list', { layout: false, countries: countries, currencies: currenciez });

    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/countries/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {

                    let data = req.body;

                    console.log('its post:', data);
                    await (await new Controllers(req).create()).country(data);
                    res.json({ status: true, notification: 'successfully added country!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add country: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let country = await (await new Controllers(req).single()).country(req.params.id);
            console.log(country);
            res.render('superadmin/countries/edit', { layout: false, country: JSON.parse(JSON.stringify(country)) });
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    console.log('its post:', data);
                    await (await new Controllers(req).update()).country(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated country!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update country: ' + err.message })
                }
            }
        }

    },

    activateCurrency: async (req, res) => {
        try {
            console.log(req.params);
            let currentCurrency = await (await new Controllers(req).findBy()).currency({ where: { countryId: req.params.id } });
            await (await new Controllers(req).update()).currency(currentCurrency[0].id, { countryId: null, userId: req.session.passport.user.id });
            await (await new Controllers(req).update()).currency(req.params.currencyId, { countryId: req.params.id, userId: req.session.passport.user.id });
            res.json({ status: true, notification: 'successfully activated currency!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate currency: ' + err.message })
        }

    }
}