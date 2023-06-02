
const { Op } = require("../../../database/mysql");
const businesses = require("../../../database/models/businesses");
const users = require("../../../database/models/users");
const invoices = require("../../../database/models/invoices");
const fs = require('fs');
const { enrols } = require("../models/updates");
const Controllers = require("../models/control");
const items = require("../../../database/models/items");
const customers = require("../../../database/models/customers");
const { GeneratePdf } = require("../models/pdf");
const path = require("path");
const { makePDF } = require("../services/pdfHandle");
const { generateRandom } = require("../services/service");
const stores = require("../../../database/models/stores");
const stockIns = require("../../../database/models/stockIns");
const stockOuts = require("../../../database/models/stockOuts");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        let stores = await (await control.find()).stores();
        res.render('superadmin/invoices/index', { layout: false, stores: stores });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let data = await (await control.getParams());
        let stocks;
        console.log(data);
        if (data.selectedStatus == 'all') {
            console.log('am here');
            stocks = await (await control.findBy()).invoice({ where: { storeId: data.selectedStore, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers }, { model: stores }] });
            console.log('stock>>>>>>>>>>>>11::', stocks);
        } else {

            if (data.selectedStore == 'all') {
                stocks = await (await control.findBy()).invoice({ where: { level: data.selectedStatus, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers }, { model: stores }] });
                console.log('stock>>>>>>>>>>>>1::', data, stocks);
            } else {
                stocks = await (await control.findBy()).invoice({ where: { storeId: data.selectedStore, level: data.selectedStatus, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers }, { model: stores }] });
                console.log('stock>>>>>>>>>>>>2::', data, stocks);
            }
        }
        res.render('superadmin/invoices/list', { layout: false, invoices: JSON.parse(JSON.stringify(await stocks)) });
    },


    items: async (req, res) => {
        const control = await new Controllers(req);
        let invoice = await (await control.findBy()).invoice({
            where: { id: req.params.id }, include: [{ model: customers }, { model: stockOuts, include: [{ model: items }, { model: stockIns }] }]
        });
        invoice = invoice[0];
        let total_amount = 0.0;
        let total_qty = 0.0;
        let total_buying_amount = 0.0;
        for (const stockOut of invoice.stock_outs) {
            total_qty += stockOut.qty;
            total_buying_amount += stockOut.stock_in.amount * stockOut.qty;
            total_amount += stockOut.stock_in.selling_price * stockOut.qty;
            stockOut['value'] = stockOut.stock_in.selling_price * stockOut.qty;
        }
        invoice['total_amount'] = total_amount;
        invoice['total_buying_amount'] = total_buying_amount;
        invoice['total_qty'] = total_qty;

        console.log(invoice);
        res.render('superadmin/invoices/items', { layout: false, stockOuts: invoice.stock_outs, invoice: invoice });
    },
    add_items: async (req, res) => {
        var control = await new Controllers(req);

        let invoice = await (await control.findBy()).invoice({ where: { id: req.params.id }, include: [{ model: customers }, { model: stockOuts }, { model: stores }] });

        invoice = await invoice[0];
        let storess = await (await control.findBy()).store({ where: { id: await invoice.storeId } });

        console.log("invoice....11", await invoice);
        let itemss = await (await control.findBy()).stockIn({ where: {}, sort: 'itemId', include: [{ model: items }] });
        for (const item of await invoice.stock_outs) {
            item['sum_qty'] = await (await control.sum()).stockIn('qty', { where: { itemId: item.itemId }, group: 'itemId' });
            item['sum_sold_qty'] = await (await control.sum()).stockOut('qty', { where: { itemId: item.itemId }, group: 'itemId' });
            item['balance'] = parseFloat(await item['sum_qty']) - parseFloat(await item['sum_sold_qty']);

        }
        var control = await new Controllers(req);
        var discountSetting = {

            amount: await (await control.authorize)('discount_amount'),
            percent: await (await control.authorize)('discount_percent'),
        };
        console.log("invoice....2", await discountSetting, await storess);
        res.render('superadmin/invoices/create_item', { layout: false, items: itemss, invoice: invoice, stores: storess, discountSetting: await discountSetting });
    },
    save_items: async (req, res) => {
        let data = req.body;
        const control = await new Controllers(req);
        console.log('data here>>>>>>::', data);
        let invoice = await (await control.create()).invoice_items(req.params.id, data);
        console.log(invoice);
        res.json({ status: true, notification: 'successfully added items to invoice' });

    },

    remove_item: async (req, res) => {
        let data = req.body;
        const control = await new Controllers(req);
        console.log('data here>>>>>>::', data);
        let invoice = await (await control.delete()).invoice_item(req.params.id, data);
        console.log(invoice);
        res.json({ status: true, notification: 'successfully removed items from invoice' });

    },
    availableStock: async (req, res) => {
        const control = await new Controllers(req);
        console.log('am here', req.params);
        let stockIns = await (await control.findCountBy()).stockIns({ where: { itemId: req.params.stockId, storeId: req.params.store }, include: [{ model: items }, { model: stores }] });

        let available = 0;
        let stocksIns = JSON.parse(JSON.stringify(stockIns.rows));

        for (const stockIn of stocksIns) {

            available += stockIn.qty;
            let stockOuts = await (await control.findCountBy()).stockOuts({ where: { stockInId: req.params.stockId, storeId: req.params.store }, include: [{ model: items }, { model: stores }] });
            let stocksOuts = JSON.parse(JSON.stringify(stockOuts.rows));
            for (const stockOut of stocksOuts) {
                available -= stockOut.qty;
            }
        }

        console.log(stockIns, available);
        if (!available <= 0) {
            res.render('superadmin/items/dropdown', { layout: false, stockIns: stocksIns });
        } else {
            res.render('superadmin/items/dropdown', { layout: false, stockIns: [] });
        }
    },
    available: async (req, res) => {
        const control = await new Controllers(req);
        let stockIns = await (await control.findCountBy()).stockIns({ where: { id: req.params.stockId, storeId: req.params.store } });

        let stockOuts = await (await control.findCountBy()).stockOuts({ where: { stockInId: req.params.stockId, storeId: req.params.store } });
        let available = 0;
        let stocksIns = JSON.parse(JSON.stringify(stockIns.rows[0]));
        let stocksOuts = JSON.parse(JSON.stringify(stockOuts.rows));
        available += stocksIns.qty;
        for (const stockOut of stocksOuts) {
            available -= stockOut.qty;
        }
        res.json({ available: await available });
    },

    categoryItems: async (req, res) => {
        const control = await new Controllers(req);
        console.log(req.params);
        let items = await (await control.findBy()).item({ where: { itemCategoryId: req.params.category, storeId: req.params.store } });
        console.log(items);
        res.render('superadmin/items/dropdown', { layout: false, items: JSON.parse(JSON.stringify(items.rows)), index: req.params.index });
    },
    pdf: async (req, res) => {
        console.log(req.query);
        const control = await new Controllers(req);
        let data = await (await control.getParams());
        let invoices = null;
        console.log(data);
        let cclass = await (await control.single()).class(data.classId);
        if (data.status == 'all' && data.classId == 'all') {
            invoices = await (await control.findCountBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
        } else {
            if (data.classId == 'all') {
                invoices = await (await control.findCountBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, status: data.status, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
            } else {
                invoices = await (await control.findCountBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, status: data.status, classId: cclass.id, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
            }

        }
        console.log(invoices.count);
        // if (invoices.rows) {

        for (const inv of invoices.rows) {
            inv['balance'] = parseFloat(inv.total_amount) - parseFloat(inv.paid_amount);

        }
        // }
        data.start = data.start + ' 00:00:00';
        data.end = data.end + ' 23:59:59';
        console.log('invoices >>>>>>>>:', invoices);
        res.render('superadmin/invoices/export', { layout: 'auth', invoices: invoices.rows, class: await cclass, type: data.type, status: data.status, start: data.start, end: data.end });
    },
    csv: async (req, res) => {
        const control = await new Controllers(req);
        let data = await (await control.getParams());
        let invoices = null;
        console.log(data);
        let cclass = await (await control.single()).class(data.classId);
        if (data.status == 'all' && data.classId == 'all') {
            invoices = await (await control.findBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });

        } else {
            if (data.classId == 'all') {
                invoices = await (await control.findBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, status: data.status, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
            } else {
                invoices = await (await control.findBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, status: data.status, classId: cclass.id, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
            }

        }
        for (const inv of invoices) {
            inv['balance'] = parseFloat(inv.total_amount) - parseFloat(inv.paid_amount);

        }
        console.log('am here!!');
        data.start = data.start + ' 00:00:00';
        data.end = data.end + ' 23:59:59';
        console.log('invoices >>>>>>>>:', invoices);
        res.render('superadmin/invoices/export', { layout: false, class: cclass, invoices: invoices, type: data.type, status: data.status, start: data.start, end: data.end });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url == '/create') {
            // let schools = await finds.schools();
            let items = await (await control.find()).items();
            let classes = await (await control.find()).classes();
            res.render('superadmin/invoices/create', { layout: false, items: items, classes: classes });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    let data = req.body;
                    data.role = 'invoice';
                    await (await control.create()).user(data);
                    res.json({ status: true, notification: 'successfully added admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
            }
        }

    },

    single: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url == '/single') {
            let stores = await (await new Controllers(req).find()).stores();
            let items = await (await new Controllers(req).findBy()).item({ where: {} });
            let item_categories = await (await control.find()).item_categories();
            let date = new Date().toISOString().split('T');
            let batch = date[0].split('-')[0] + date[0].split('-')[1] + date[0].split('-')[2] + date[1].split(':')[0] + date[1].split(':')[1] + (date[1].split(':')[2]).split('.')[0];
            console.log('batch>>>>>>>>>>', batch, date);
            let customers = await (await control.find()).customers();
            res.render('superadmin/invoices/single', { layout: false, stores: stores, categories: item_categories });
        } else {
            if (req.method == 'POST' && req.url.includes('/single')) {
                try {

                    let data = req.body;
                    await (await control.create()).stockOut(data);
                    console.log('its post single:');
                    await res.json({ status: true, notification: 'successfully added invoice!' })

                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to add invoice: ' + err.message })
                }
            }
        }

    },
    mass: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url == '/mass') {
            // let schools = await finds.schools();
            let classes = await (await control.find()).classes();
            res.render('superadmin/invoices/mass.hbs', { layout: false, items: items, classes: classes });
        } else {
            console.log('its post mass:');
            if (req.method == 'POST' && req.url.includes('/mass')) {
                try {
                    console.log('its post mass:');
                    let customers = await (await control.findBy()).enrol({ where: { classId: req.body.classId, sectionId: req.body.sectionId, } });
                    for (const stu of customers) {
                        let data = req.body;
                        data['studentId'] = stu.studentId;
                        data['classId'] = stu.classId;
                        await (await control.create()).stockOut(data);
                    }
                    res.json({ status: true, notification: 'successfully added all invoices!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add invoice: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let invoices = await (await control.single()).enrols(req.params.id);
            let items = await (await control.find()).items();
            let classes = await (await control.find()).classes();
            let parents = await (await control.find()).parents();
            console.log(invoices);
            res.render('superadmin/invoices/update', { layout: false, enrol: invoices, items: items, classes: classes, parents: parents });
        } else {
            if (req.method == 'POST') {
                try {

                    let data = req.body;
                    let enrol = await (await control.single()).enrols(req.params.id);
                    await (await control.update()).user(enrol.invoice.user.id, data);
                    await (await control.update()).stockOut(enrol.invoice.id, data);
                    let enr = {
                        classId: data.classId,
                        sectionId: await data.sectionId,
                    }
                    await (await control.update()).enrols(enrol.id, enr);
                    res.json({ status: true, notification: 'successfully updated invoice!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update invoice: ' + err.message })
                }
            }
        }

    },

    // classSection: async (req, res) => {
    //     const control = await new Controllers(req);
    //     try {
    //         let invoicez = await (await control.findBy()).enrol({ where: { classId: req.params.class, sectionId: req.params.section, businessId: 1 }, include: [{ model: invoices, include: [{ model: users }, { model: parents, include: { model: users } }] }, { model: classes }, { model: items }] });
    //         console.log('invoice list->', invoicez);
    //         res.render('superadmin/invoices/list', { layout: false, invoices: invoicez });
    //     } catch (err) {
    //         res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
    //     }

    // },
    export: async (req, res) => {
        const control = await new Controllers(req);
        let data = await (await control.getParams());
        let cookie = req.cookies;
        console.log(data);
        try {
            if (data.type == 'pdf') {
                let opt = {};
                opt.limit = 29;
                opt.page = 1;
                opt.pages = 1;
                let make = await makePDF({ data: [data], opt, cookies: cookie }, '/invoices/report/pdf', opt.pages);
                // console.log("MAKE>>>>>>>>>>>>", make);

                if (make) {
                    make.maker.end(async () => {
                        try {
                            await fs.statSync(make.info.path);
                            make.maker.emit('close');
                        } catch (err) {
                            make.maker.emit('end');
                        }
                    });
                    make.maker.on('close', async () => {

                        // Streamer.once('open', async () => {
                        if (fs.existsSync(make.info.path)) {
                            const Streamer = fs.createReadStream(make.info.path);
                            console.log('am here at cose >>>>>>....', make.info.path);
                            console.log('am here at cose >>>>>>....');
                            let tempHTML = path.resolve(path.basename('./') + '/backend/catch/html/temp.html');
                            console.log('am here already!');
                            let stat = fs.statSync(make.info.path);
                            res.setHeader('Content-length', stat.size);
                            res.setHeader('Content-type', 'application/pdf');
                            res.setHeader('Content-Disposition', `inline;filename=${make.info.name}`);
                            Streamer.pipe(res);
                        }

                    });
                }
            }
            if (data.type == 'invoice') {
                let make = await makePDF({ data: [data], cookies: cookie }, '/invoices/invoice/' + data.id);
                if (make) {
                    setTimeout(async () => {
                        console.log(make.maker.closed);
                        if (await make.maker.closed) {
                            const Streamer = await fs.createReadStream(make.info.path);
                            let stat = await fs.statSync(make.info.path);
                            await res.setHeader('Content-length', await stat.size);
                            await res.setHeader('Content-type', 'application/pdf');
                            await res.setHeader('Content-Disposition', `inline;filename=${make.info.name}`);

                            await Streamer.pipe(res).on('finish', () => {
                                fs.unlinkSync(make.info.path);
                            });
                            // res.end();
                        }
                    }, 5500);
                    // make.maker.once('close', async () => {


                    // });
                }

            }
            if (data.type == 'csv') {
                let cclass = await (await control.single()).class(data.classId);
                let invoices = null;
                if (data.status == 'all') {
                    if (data.classId == 'all') {
                        cclass = [];
                        invoices = await (await control.findBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
                    } else {

                        invoices = await (await control.findBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, classId: cclass.id, status: data.status, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
                    }
                } else {
                    if (data.classId == 'all') {
                        cclass = [];
                        invoices = await (await control.findBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
                    } else {
                        invoices = await (await control.findBy()).stockOut({ where: { businessId: await (await control.getCurrentSession()).businessId, classId: cclass.id, status: data.status, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: customers, include: { model: users } }, { model: classes }] });
                    }

                }
                for (const inv of invoices) {
                    inv['balance'] = parseFloat(inv.total_amount) - parseFloat(inv.paid_amount);

                }
                let csvname = 'customers_invoice_' + data.start + 'to' + data.end + '.' + data.type;
                csvPath = path.resolve(path.basename('./') + '/backend/catch/csv/' + csvname);
                let csvWriter = fs.createWriteStream(csvPath);
                csvWriter.once('open', async () => {
                    csvWriter.once('ready', async () => {
                        console.log('am ready');
                        await csvWriter.write(`TITLE, STUDENT,TOTAL AMOUNT, PAID AMOUNT, CREATE DATE, PAYMENT DATE\r`);
                        for (const inv of invoices) {
                            await csvWriter.write(`${inv.title},${inv.student.user.name},${inv.total_amount},${inv.paid_amount},${inv.createdAt},${inv.updatedAt}\r`);
                        }
                        await csvWriter.end(async () => {
                            let stat = await fs.statSync(csvPath);
                            await res.setHeader('Content-length', await stat.size);
                            await res.setHeader('Content-type', 'application/csv');
                            await res.setHeader('Content-Disposition', `attachment;filename=${csvname}`);
                            let reader = fs.createReadStream(csvPath);
                            reader.pipe(res).on('finish', () => {
                                fs.unlinkSync(csvPath);
                            });
                        });
                    });
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    classWise: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let id = req.params.selected;
            if (id != undefined) {
                let invoicez = await (await control.findBy()).enrol({ where: { classId: req.params.class, sessionId: 1 }, include: [{ model: invoices, include: { model: users } }] });
                console.log('invoice list->', invoicez);
                res.render('superadmin/invoices/selectedDropdown', { layout: false, enrols: invoicez, selected: id });
            } else {

                let studentz = await (await control.findBy()).enrol({ where: { classId: req.params.class, sessionId: 1 }, include: [{ model: invoices, include: { model: users, nested: false } }] });
                console.log('student list->', studentz);
                res.render('superadmin/invoices/dropdown', { layout: false, enrols: studentz });
            }
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    }
}