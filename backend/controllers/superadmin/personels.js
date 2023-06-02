const { Op } = require("../../../database/mysql");
const fs = require('fs');
const { enrols } = require("../models/updates");
const Controllers = require("../models/control");
const { users, personels } = require("../../../database/models/module_exporter");
module.exports = {
    index: async (req, res) => {
        try {

            const control = await new Controllers(req);
            let stores = await (await control.find()).stores();
            console.log('req', req.url);
            res.render('superadmin/personels/index', { layout: false, stores: stores });
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let _session = await (await control.getCurrentSession());
        let personelzz = [];
        let enrols = await (await control.findBy()).personel({ where: { businessId: _session.businessId, sessionId: _session.sessionId }, include: [{ model: users }] });

        // for (const enrol of enrols) {
        //     enrol.personel['customer'] = enrol.customer;

        //     personelzz.push(enrol.personel);
        // }
        // console.log('personels', personelzz);
        res.render('superadmin/personels/list', { layout: false, personels: JSON.parse(JSON.stringify(enrols)) });
    },

    profile: async (req, res) => {

        const control = await new Controllers(req);
        let personels = await (await control.single()).enrols(req.params.id);
        console.log(personels);
        res.render('superadmin/personels/profile', { layout: false, enrol: JSON.parse(JSON.stringify(personels)) });
    },


    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            // let businesses = await finds.businesses();
            res.render('superadmin/personels/create.hbs', { layout: false, });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    const control = await new Controllers(req);
                    let data = req.body;
                    data.role = 'customer-personel';
                    await (await control.create()).personel(data);
                    console.log('its post single:');
                    res.json({ status: true, notification: 'successfully added personel' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add personel: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let businesses = await (await control.find()).businesses();
            let personel = await (await control.single()).personel(req.params.id);
            console.log(personel);
            res.render('superadmin/personels/edit', { layout: false, personel: personel, businesses: businesses });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    let personel = await (await control.single()).personel(req.params.id);
                    await (await control.update()).user(personel.user.id, data);
                    res.json({ status: true, notification: 'successfully updated personel!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update personel: ' + err.message })
                }
            }
        }

    },

    classSection: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let personelz = JSON.parse(JSON.stringify(await (await control.findBy()).enrol({ where: { classId: req.params.class, sectionId: req.params.section, businessId: 1 }, include: [{ model: personels, include: { model: users, nested: false } }] })));
            console.log('personel list->', personelz);
            res.render('superadmin/personels/list', { layout: false, personels: personelz });
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    }
}