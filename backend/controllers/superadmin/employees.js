const models = require("../../../database/models/module_exporter");
const { Op } = require("../../../database/mysql");
const i18n = require("../../helpers/languages/i18n.config");
const Controllers = require("../controls/control");
const fs = require('fs');
module.exports = {
    index: async (req, res) => {
        console.log('req', req.session);

        res.render('superadmin/employees/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let employees = await (await control.find('employees', { include: [{ model: models.contacts, include: [{ model: models.users, include: [{ model: models.addresses }, { model: models.uploads }] }] }] }));
        console.log(await employees);
        res.render('superadmin/employees/employees', { layout: false, employees: JSON.parse(JSON.stringify(employees)) });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let action = '/employees/create';
            res.render('superadmin/employees/employee', { layout: false, action: action });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    if (req.file) {
                        let data = req.body;
                        console.log(data, req.body);
                        (data.phone) ? data.phone = data.phone.includes('255') ? parseInt(data.phone.split('255')[1]) : parseInt(data.phone) : null;
                        // (data.phone) ? data.phone = parseInt(data.phone.split('255')[1]) : null;
                        let employee = await models.employees.build(data).save();
                        let country = await (await models.regions.findOne({ where: { name: 'Arusha' } }));
                        data['countryId'] = await country.id;
                        data.phone = data.phone ? parseInt(data.phone) : 0;
                        let contact = await models.contacts.build(data).save();
                        let upload = await models.uploads.build(req.file).save();
                        data['uploadId'] = await upload.id;
                        let data2 = data;
                        data2.status = 'none';
                        let user = await models.users.build(data2).save();
                        data.status = req.body.status;
                        let address = await models.addresses.build(data).save();
                        await employee.addContact(await contact);
                        /** employee contacts tailed to the users details */
                        await user.addContact(await contact);
                        await user.addAddress(await address);
                        res.json({ status: true, notification: i18n.__('successfully added') + ' ' + i18n.__('employee') + '!' });
                    } else {
                        res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('employee provide image') + '!' });
                    }
                } catch (err) {
                    console.log(err);

                    res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('employee') + ': ' + i18n.__(err.message) + '\n' + err.original })

                }
            }
        }

    },
    employer_create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/employers/create/' + req.params.id) {
            let action = '/employees/employers/create/' + req.params.id;
            let employers = await (await control.find('employers', { where: { status: 'employing' } }));
            console.log('employers:::::>>', employers);
            res.render('superadmin/employees/employer', { layout: false, action: action, employers: await employers });
        } else {
            if (req.method == 'POST' && req.url.includes('/employers/create/')) {
                try {
                    let data = req.body;
                    data['employeeId'] = req.params.id;
                    await (await control.create('employee_employers', data));
                    res.status(200).json({ status: true, notification: "successfully added employee's employer!" })
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
            let employee = await (await control.single('employees', { where: { id: req.params.id }, include: [{ model: models.contacts, include: [{ model: models.users, include: [{ model: models.addresses }, { model: models.uploads }] }] }] }));
            console.log(employee.id);
            let action = '/employees/edit/' + employee.id
            res.render('superadmin/employees/employee', { layout: false, employee: employee, action: action });
        } else {
            if (req.method == 'POST') {
                try {
                    let data = req.body;
                    let employee = await (await control.single('employees', { where: { id: req.params.id }, include: [{ model: models.contacts, include: [{ model: models.users, include: [{ model: models.addresses }, { model: models.uploads }] }] }] }));
                    if (req.file) {
                        console.log('its post:', employee.contacts);
                        await fs.unlinkSync(path.resolve(__dirname + '../../../../' + employees.upload.path));
                        await (await control.update('uploads', req.file, { where: { id: employee.upload.id } }));
                        await (await control.update('employees', data, { where: { id: req.params.id } }));
                        (data.phone) ? data.phone = parseInt(data.phone.split('255')[1]) : null;
                        let country = await (await models.regions.findOne({ where: { name: 'Arusha' } }));
                        data['countryId'] = await country.id;
                        await (await control.update('contacts', data, { where: { id: employee.contacts[0].id } }));
                        await (await control.update('addresses', data, { where: { id: employee.contacts[0].users[0].addresses[0].id } }));
                        res.json({ status: true, notification: 'successfully updated employee!' });
                    } else {
                        console.log('its post2:', employee.contacts);
                        let country = await (await models.regions.findOne({ where: { name: 'Arusha' } }));
                        data['countryId'] = await country.id;
                        await (await control.update('employees', data, { where: { id: req.params.id } }));
                        await (await control.update('contacts', data, { where: { id: employee.contacts[0].id } }));
                        await (await control.update('addresses', data, { where: { id: employee.contacts[0].users[0].addresses[0].id } }));
                        res.json({ status: true, notification: 'successfully updated employee!' });
                    }
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to update employee: ' + err.message })
                }
            }
        }

    },

    delete: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let oldEmployee = await (await control.delete('employees', { where: { id: req.params.id } }));
            // if (oldSession) {
            //     console.log(await oldSession);
            //     await (await control.update()).admin(oldSession[0].id, { status: 0 });
            // }
            // await (await control.update()).admin(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully delete employee!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to delete employee: ' + err.message })
        }

    },
    profile: async (req, res) => {

        const control = await new Controllers(req);

        try {
            if (req.method == 'GET') {
                /** add task history summary */
                let employee = await (await control.single('employees', { where: { id: req.params.id }, include: [{ model: models.contacts, include: [{ model: models.users, include: [{ model: models.addresses }, { model: models.uploads }] }] }] }));
                console.log(await employee.id);
                let action = '/employees/edit/' + employee.id
                res.render('superadmin/employees/profile', { layout: false, employee: employee, action: action });
            }
        } catch (err) {
            console.log(err);
            res.json({ status: false, notification: 'failed to delete employee: ' + err.message })
        }

    }
}