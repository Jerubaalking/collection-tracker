const express = require('express');
const { Op } = require("../../database/mysql");
const Controllers = require('../controllers/models/control');
const localStore = require('store2');
const router = express.Router();


const { isLoggedIn } = require('../../passport/passport');
const { menus, roles, languages } = require('../../database/models/module_exporter');
const i18n = require('../helpers/languages/i18n.config');
// const upload = require('../controllers/services/multerConfig');

router.get('/', isLoggedIn, async (req, res) => {
    const control = await new Controllers(req);
    let language = JSON.parse(JSON.stringify(await languages.findAll()));
    let main = JSON.parse(JSON.stringify(await (await control.findBy()).role({ include: { model: menus } })));
    let sub_menu = [];
    let menu_main = [];
    for (const role of main) {
        if (role.role == 'admin') {
            for (const menu of role.menus) {
                if (menu.parent != 0) {
                    sub_menu.push(menu);
                } else {
                    menu_main.push(menu);
                }
            }
        }
    }

    console.log('business>>>>>::', menu_main, sub_menu);
    res.render('admin_home', {
        locale: i18n.getLocale(),
        viewManager: req.session.passport.user, languages: language,
        menus: menu_main, sub_menu: sub_menu,
    });
});
router.get('/home', isLoggedIn, async (req, res) => {

    const control = await new Controllers(req);
    let main = JSON.parse(JSON.stringify(await (await control.find()).main_menus()));
    let sub = JSON.parse(JSON.stringify(await (await control.find()).sub_menus()));
    let expenses = JSON.parse(JSON.stringify(await (await control.find()).expenses()));
    let employees = await (await control.findBy()).employee();
    let customer_personel = await (await control.findBy()).user({ where: {}, include: { model: roles } });
    let customer_personels = [];
    for (const personel of customer_personel.data) {
        for (const role of personel.roles) {
            if (role.role == 'customer-personel') {
                customer_personels.push(personel);
            }
        }

    }
    /** Invoice */
    let invoicess = await (await control.findBy()).invoice({
        where: {}, include: [{ model: customers }, { model: stockOuts, include: [{ model: items }, { model: stockIns }] }, { model: transactions }]
    });
    for (const invoice of invoicess) {
        let total_amount = 0.0;
        let paid_amount = 0.0;
        let total_qty = 0.0;
        let total_buying_amount = 0.0;
        for (const stockOut of invoice.stock_outs) {
            total_qty += stockOut.qty;
            total_buying_amount += stockOut.stock_in.amount * stockOut.qty;
            total_amount += stockOut.stock_in.selling_price * stockOut.qty;
            stockOut['value'] = stockOut.stock_in.selling_price * stockOut.qty;
        }
        for (const transaction of invoice.transactions) {
            paid_amount += transaction.amount;
        }
        invoice['total_amount'] = total_amount;
        invoice['total_buying_amount'] = total_buying_amount;
        invoice['total_qty'] = total_qty;
        invoice['paid_amount'] = paid_amount;
    }
    /** end of invoices */
    let customerss = await (await control.find()).customers();
    let staff = await (await control.find()).staff();
    // let expenses = JSON.parse(JSON.stringify(await (await control.find()).expenses()));
    let payload = await (await control.getCurrentSession());
    console.log('customer-personels', customer_personel);
    res.render('home', {
        layout: false,
        viewManager: payload,
        menus: main, sub_menu: sub, invoices: invoicess, expenses: expenses,
        customer_personels: customer_personels.length,
        employees: (employees) ? employees.count : 0, customers: (customerss) ? customerss.count : 0, staff: staff.count
    });
});
router.post('/enter', isLoggedIn, async (req, res) => {

    let businessId = req.body.businessId;
    console.log(req.cookies);
    let business = JSON.parse(JSON.stringify(await businesses.findByPk(businessId)));
    req.session.passport['business'] = await business;
    res.status(200).json({ status: true, linking: '/distributor' });
});
router.get('/navigation', async (req, res) => {
    // let prevelage = req.query.prevelage;
    const control = await new Controllers(req);
    let menuss = await (await control.find()).menus();
    console.log('menus>>>>', menuss);
    res.render('partials/navigation.hbs', { layout: false, menus: menuss });
});

module.exports = router;