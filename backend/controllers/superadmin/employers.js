const models = require("../../../database/models/module_exporter");
const { Op } = require("../../../database/mysql");
const i18n = require("../../helpers/languages/i18n.config");
const Controllers = require("../controls/control");
const fs = require('fs');
module.exports = {
    index: async (req, res) => {
        console.log('req', req.session);

        res.render('superadmin/employers/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let employees = await (await control.find('employers', { include: [{ model: models.uploads }, { model: models.contacts }, { model: models.addresses }] }));
        console.log(await employees);
        res.render('superadmin/employers/employers', { layout: false, employers: JSON.parse(JSON.stringify(employees)) });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let action = '/employers/create';
            res.render('superadmin/employers/employer', { layout: false, action: action });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    if (req.file) {
                        let data = req.body;
                        (data.phone) ? data.phone = parseInt(data.phone.split('255')[1]) : null;
                        // (data.phone) ? data.phone = parseInt(data.phone.split('255')[1]) : null;
                        let country = await (await models.regions.findOne({ where: { name: 'Arusha' } }));
                        data['countryId'] = await country.id;
                        let contact = await models.contacts.build(data).save();
                        let upload = await models.uploads.build(req.file).save();
                        data['uploadId'] = await upload.id;
                        let employer = await models.employers.build(data).save();
                        let address = await models.addresses.build(data).save();
                        await employer.addContact(await contact);
                        await employer.addAddress(await address);
                        res.json({ status: true, notification: i18n.__('successfully added') + ' ' + i18n.__('employer') + '!' });
                    } else {
                        res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('employer provide image') + '!' });
                    }
                } catch (err) {
                    console.log(err);

                    res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('employer') + ': ' + i18n.__(err.message) + '\n' + err.original })

                }
            }
        }

    },

    
    edit: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let employer = await (await control.single('employers', { where: { id: req.params.id }, include: [{ model: models.contacts }, { model: models.addresses }, { model: models.uploads }] }));
            console.log(await employer.id);

            let action = '/employers/edit/' + employer.id
            res.render('superadmin/employers/employer', { layout: false, employer: employer, action: action });
        } else {
            if (req.method == 'POST') {
                try {
                    let data = req.body;
                    let employer = await (await control.single('employers', { where: { id: req.params.id }, include: [{ model: models.uploads }, { model: models.contacts }, { model: models.addresses }] }));
                    if (req.file) {
                        console.log('its post:', employer.contacts);
                        await fs.unlinkSync(path.resolve(__dirname + '../../../../' + employers.upload.path));
                        await (await control.update('uploads', req.file, { where: { id: employer.upload.id } }));
                        await (await control.update('employers', data, { where: { id: req.params.id } }));
                        (data.phone) ? data.phone = parseInt(data.phone.split('255')[1]) : null;
                        let country = await (await models.regions.findOne({ where: { name: 'Arusha' } }));
                        data['countryId'] = await country.id;
                        await (await control.update('contacts', data, { where: { id: employer.contacts[0].id } }));
                        await (await control.update('addresses', data, { where: { id: employer.addresses[0].id } }));
                        res.json({ status: true, notification: 'successfully updated employer!' });
                    } else {
                        console.log('its post2:', employer.contacts);
                        let country = await (await models.regions.findOne({ where: { name: 'Arusha' } }));
                        data['countryId'] = await country.id;
                        await (await control.update('employers', data, { where: { id: req.params.id } }));
                        await (await control.update('contacts', data, { where: { id: employer.contacts[0].id } }));
                        await (await control.update('addresses', data, { where: { id: employer.addresses[0].id } }));
                        res.json({ status: true, notification: 'successfully updated employer!' });
                    }
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to update employer: ' + err.message })
                }
            }
        }

    },

    delete: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let oldEmployee = await (await control.delete('employers', { where: { id: req.params.id } }));
            // if (oldSession) {
            //     console.log(await oldSession);
            //     await (await control.update()).admin(oldSession[0].id, { status: 0 });
            // }
            // await (await control.update()).admin(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully delete employer!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to delete employer: ' + err.message })
        }

    },
    profile: async (req, res) => {

        const control = await new Controllers(req);

        try {
            if (req.method == 'GET') {
                let employer = await (await control.single('employers', { where: { id: req.params.id }, include: [{ model: models.contacts }, { model: models.addresses }, { model: models.uploads }] }));
                console.log(await employer.id);
                let action = '/employers/edit/' + employer.id
                res.render('superadmin/employers/employers', { layout: false, employer: employer, action: action });
            }
        } catch (err) {
            console.log(err);
            res.json({ status: false, notification: 'failed to delete employer: ' + err.message })
        }

    }
}