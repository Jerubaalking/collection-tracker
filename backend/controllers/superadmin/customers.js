
const { Op } = require("../../../database/mysql");
const fs = require('fs');
const { enrols } = require("../models/updates");
const Controllers = require("../models/control");
const { generateRandom } = require("../services/service");
const { businesses, users, personels, stores, customers } = require("../../../database/models/module_exporter");
let _many_module = 'businesses';
let _single_module = 'business';
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        let stores = await (await control.find()).stores();
        res.render('superadmin/customers/index', { layout: false, stores: stores });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        console.log(req.query);
        let customerz = null;
        customerz = (req.params.store == 'all') ?
            await (await control.findBy()).enrol({ where: {}, include: [{ model: customers }, { model: personels, include: { model: users } }, { model: stores }] }) :
            await (await control.findBy()).enrol({ where: { storeId: req.params.store }, include: [{ model: customers }, { model: personels, include: { model: users } }, { model: stores }] });
        console.log('customers:::>>>>>>>||', customerz);
        res.render('superadmin/customers/list', { layout: false, customers: customerz });
    },

    profile: async (req, res) => {
        const control = await new Controllers(req);
        let customers = await (await control.single()).enrols(req.params.id);
        res.render('superadmin/customers/profile', { layout: false, enrol: customers });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            // let businesses = await finds.businesses();
            let stores = await (await control.find()).stores();
            // let classes = await (await control.find()).classes();
            res.render('superadmin/customers/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    let data = req.body;
                    data.role = 'customer';
                    await (await control.create()).customers(data);
                    res.json({ status: true, notification: 'successfully added admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
            }
        }

    },
    add_invoice: async (req, res) => {
        const control = await new Controllers(req);
        let invoice_number = await generateRandom(12);
        let customers = await (await control.single()).customer(req.params.id);
        console.log(customers);
        res.render('superadmin/customers/invoice', { layout: false, invoice_number: invoice_number, customer: customers });
    },
    save_invoice: async (req, res) => {
        const control = await new Controllers(req);
        let data = req.body;
        try {
            let customers = await (await control.single()).customer(req.params.id);
            data['customerId'] = customers.id;
            data['storeId'] = customers.store.id;
            let invoice = await (await control.create()).invoice(data);
            console.log(invoice, customers);
            res.json({ status: true, notification: 'successfully added invoice' });
        } catch (err) {
            console.log(err);
            res.json({ status: false, notification: 'failed to add invoice\n\r' + err.message });
        }
    },

    single: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url == '/create/single') {
            // let businesses = await finds.businesses();
            let stores = await (await control.find()).stores();
            // let classes = await (await control.find()).classes();
            let personels = await (await control.find()).personels();
            res.render('superadmin/customers/single_customer_admission.hbs', { layout: false, personels: personels });
        } else {
            if (req.method == 'POST' && req.url.includes('/create/single')) {
                try {

                    if (req.file) {
                        let data = req.body;
                        data.role = 'customer';
                        await (await control.create()).customer(data);
                        console.log('its post single:');
                        res.json({ status: true, notification: 'successfully added customer!' })
                    }
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add customer: ' + err.message })
                }
            }
        }

    },
    bulk: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url == '/create/bulk') {
            // let businesses = await finds.businesses();
            let stores = await (await control.find()).stores();
            // let classes = await (await control.find()).classes();
            let personels = await (await control.find()).personels();
            res.render('superadmin/customers/bulk_customer_admission.hbs', { layout: false, stores: stores, personels: personels });
        } else {
            if (req.method == 'POST' && req.url.includes('/create/bulk')) {
                try {
                    let data = req.body;
                    console.log('its post bulk:', data);
                    await (await control.create()).bulkCustomer(data);
                    res.json({ status: true, notification: 'successfully added customer!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add customer: ' + err.message })
                }
            }
        }

    },
    excel: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url == '/create/excel') {
            // let businesses = await finds.businesses();
            // let stores = await (await control.find()).stores();
            let personels = await (await control.find()).personels();
            res.render('superadmin/customers/excel_customer_admission.hbs', { layout: false, personels: personels });
        } else {
            if (req.method == 'POST' && req.url.includes('/create/excel')) {

                console.log('its post excel:', req.file);
                try {
                    if (req.file) {
                        let file = req.file;
                        let csv_path = file.path;
                        let csv_data = fs.readFileSync(csv_path, { encoding: 'utf8' });
                        let csvArray = csv_data.split('\n');
                        let titles = csvArray[0].split(',');

                        let data = {};
                        console.log("data looks like this::", data);
                        for (let i = 0; i < csvArray.length; i++) {
                            if (i !== 0) {
                                let customercsv = csvArray[i].split(',');
                                if (data)
                                    data['name'].push(customercsv[0]);
                                data['email'].push(customercsv[1]);
                                data['password'].push(customercsv[2]);
                                data['phone'].push(customercsv[3]);
                                data['parentId'].push(customercsv[4]);
                                data['gender'].push(customercsv[5]);
                            } else {
                                data['name'] = [];
                                data['email'] = [];
                                data['password'] = [];
                                data['phone'] = [];
                                data['parentId'] = [];
                                data['gender'] = [];
                            }
                        }
                        data['classId'] = req.body.classId;
                        data['storeId'] = req.body.storeId;
                        data['role'] = 'customer';
                        console.log("data before save", data);
                        await (await control.create()).bulkCustomer(data);
                        res.json({ status: true, notification: 'successfully added customers!' })
                    }
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to add customers: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let customers = await (await control.single()).enrols(req.params.id);
            // let stores = await (await control.find()).stores();
            // let classes = await (await control.find()).classes();
            let personels = await (await control.find()).personels();
            console.log(customers);
            res.render('superadmin/customers/update', { layout: false, enrol: customers, personels: personels });
        } else {
            if (req.method == 'POST') {
                try {

                    let data = req.body;
                    let enrol = await (await control.single()).enrols(req.params.id);
                    await (await control.update()).user(enrol.customer.user.id, data);
                    await (await control.update()).customer(enrol.customer.id, data);
                    let enr = {
                        classId: data.classId,
                        storeId: await data.storeId,
                    }
                    await (await control.update()).enrols(enrol.id, enr);
                    res.json({ status: true, notification: 'successfully updated customer!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update customer: ' + err.message })
                }
            }
        }

    },

    classSection: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let customerz = await (await control.findBy()).enrol({ where: { classId: req.params.class, storeId: req.params.store, businessId: 1 }, include: [{ model: customers, include: [{ model: users }, { model: personels, include: { model: users } }] }, { model: classes }, { model: stores }] });
            console.log('customer list->', customerz);
            res.render('superadmin/customers/list', { layout: false, customers: customerz });
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    },
    classWise: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let id = req.params.selected;
            if (id != undefined) {
                let customerz = await (await control.findBy()).enrol({ where: { classId: req.params.class, sessionId: 1 }, include: [{ model: customers, include: { model: users } }] });
                console.log('customer list->', customerz);
                res.render('superadmin/customers/selectedDropdown', { layout: false, enrols: customerz, selected: id });
            } else {

                let customerz = await (await control.findBy()).enrol({ where: { classId: req.params.class, sessionId: 1 }, include: [{ model: customers, include: { model: users, nested: false } }] });
                console.log('customer list->', customerz);
                res.render('superadmin/customers/dropdown', { layout: false, enrols: customerz });
            }
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    }
}