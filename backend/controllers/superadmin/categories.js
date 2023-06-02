const models = require("../../../database/models/module_exporter");
const { Op } = require("../../../database/mysql");
const i18n = require("../../helpers/languages/i18n.config");
const Controllers = require("../controls/control");
const fs = require('fs');
module.exports = {
    index: async (req, res) => {
        console.log('req', req.session);

        res.render('superadmin/categories/index', { layout: false });
    },


    list: async (req, res) => {
        const control = await new Controllers(req);
        let charges = await (await control.find('charges', {}));
        console.log(await charges);
        res.render('superadmin/charges/list', { layout: false, charges: JSON.parse(JSON.stringify(charges)) });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let action = '/categories/create';
            res.render('superadmin/categories/category', { layout: false, action: action });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    let data = req.body;
                    // data['handler']
                    await (await control.create('categories', req.body));
                    res.json({ status: true, notification: 'successfully added category!' });
                } catch (err) {
                    console.log(err);

                    res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('charge') + ': ' + i18n.__(err.message) + '\n' + err.original })

                }
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let charge = await (await control.single('charges', { where: { id: req.params.id }, include: [{ model: models.contacts }, { model: models.addresses }, { model: models.uploads }] }));
            console.log(charge.id);
            let action = '/charges/edit/' + charge.id
            res.render('superadmin/charges/charge', { layout: false, charge: charge, action: action });
        } else {
            if (req.method == 'POST') {
                try {
                    let data = req.body;
                    let charge = await (await control.single('charges', { where: { id: req.params.id }, include: [{ model: models.uploads }, { model: models.contacts }, { model: models.addresses }] }));
                    if (req.file) {
                        console.log('its post:', charge.contacts);
                        await fs.unlinkSync(path.resolve(__dirname + '../../../../' + charges.upload.path));
                        await (await control.update('uploads', req.file, { where: { id: charge.upload.id } }));
                        await (await control.update('charges', data, { where: { id: req.params.id } }));
                        (data.phone) ? data.phone = parseInt(data.phone.split('255')[1]) : null;
                        let country = await (await models.regions.findOne({ where: { name: 'Arusha' } }));
                        data['countryId'] = await country.id;
                        await (await control.update('contacts', data, { where: { id: charge.contacts[0].id } }));
                        await (await control.update('addresses', data, { where: { id: charge.addresses[0].id } }));
                        res.json({ status: true, notification: 'successfully updated charge!' });
                    } else {
                        console.log('its post2:', charge.contacts);
                        let country = await (await models.regions.findOne({ where: { name: 'Arusha' } }));
                        data['countryId'] = await country.id;
                        await (await control.update('charges', data, { where: { id: req.params.id } }));
                        await (await control.update('contacts', data, { where: { id: charge.contacts[0].id } }));
                        await (await control.update('addresses', data, { where: { id: charge.addresses[0].id } }));
                        res.json({ status: true, notification: 'successfully updated charge!' });
                    }
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to update charge: ' + err.message })
                }
            }
        }

    },

    delete: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let oldEmployee = await (await control.delete('charges', { where: { id: req.params.id } }));
            // if (oldSession) {
            //     console.log(await oldSession);
            //     await (await control.update()).admin(oldSession[0].id, { status: 0 });
            // }
            // await (await control.update()).admin(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully delete charge!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to delete charge: ' + err.message })
        }

    },
    profile: async (req, res) => {

        const control = await new Controllers(req);

        try {
            if (req.method == 'GET') {
                let charge = await (await control.single('charges', { where: { id: req.params.id }, include: [{ model: models.contacts }, { model: models.addresses }, { model: models.uploads }] }));
                console.log(await charge.id);
                let action = '/charges/edit/' + charge.id
                res.render('superadmin/charges/charges', { layout: false, charge: charge, action: action });
            }
        } catch (err) {
            console.log(err);
            res.json({ status: false, notification: 'failed to delete charge: ' + err.message })
        }

    }
}