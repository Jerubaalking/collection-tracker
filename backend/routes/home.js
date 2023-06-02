const express = require('express');
const { Op } = require("../../database/mysql");
const Controllers = require('../controllers/controls/control');
const router = express.Router();
const models = require('../../database/models/module_exporter');
const { isLoggedIn } = require('../../passport/passport');
const i18n = require('../helpers/languages/i18n.config');
// const upload = require('../controllers/services/multerConfig');

router.get('/', async (req, res) => {
    // const control = await new Controllers(req);
    // let main = JSON.parse(JSON.stringify(await (await control.findBy()).main_menus({ where: {} })));
    // let sub = JSON.parse(JSON.stringify(await (await control.find()).sub_menus()));
    // // let expenses = JSON.parse(JSON.stringify(await (await control.find()).expenses()));
    // // let employees = await (await control.findBy()).employee();

    // let customer_personel = await (await control.findBy()).user({ where: {}, include: { model: roles } });
    // let customer_personels = [];
    // for (const personel of customer_personel.data) {
    //     for (const role of personel.roles) {
    //         if (role.role == 'customer-personel') {
    //             customer_personels.push(personel);
    //         }
    //     }

    // }
    /** Invoice */
    // let invoicess = await (await control.findBy()).invoice({
    //     where: {}, include: [{ model: customers }, { model: stockOuts, include: [{ model: items }] }, { model: transactions }]
    // });
    // for (const invoice of invoicess) {
    //     let total_amount = 0.0;
    //     let paid_amount = 0.0;
    //     let total_qty = 0.0;
    //     let total_buying_amount = 0.0;
    //     for (const stockOut of invoice.stock_outs) {
    //         total_qty += stockOut.qty;
    //         total_buying_amount += stockOut.stock_in.amount * stockOut.qty;
    //         total_amount += stockOut.stock_in.selling_price * stockOut.qty;
    //         stockOut['value'] = stockOut.stock_in.selling_price * stockOut.qty;
    //     }
    //     for (const transaction of invoice.transactions) {
    //         paid_amount += transaction.amount;
    //     }
    //     invoice['total_amount'] = total_amount;
    //     invoice['total_buying_amount'] = total_buying_amount;
    //     invoice['total_qty'] = total_qty;
    //     invoice['paid_amount'] = paid_amount;
    // }

    /** End of invoice */

    // let customerss = await (await control.find()).customers();
    // let staff = await (await control.find()).staff();
    // let expenses = JSON.parse(JSON.stringify(await (await control.find()).expenses()));
    // let payload = await (await control.getCurrentSession());
    // console.log('customer-personels', customer_personels);
    // res.render('home', {
    //     viewManager: payload,
    //     menus: main, sub_menu: sub
    // });
    res.render('index', { layout: 'landing' });
});

router.get('/home', isLoggedIn, async (req, res) => {
    console.log(req.session.passport.user);
    const control = await new Controllers(req);
    let language = await (await control.find('languages'));
    let main = await (await control.find('roles', { include: { model: models.menus } }));
    let sub_menu = [];
    let menu_main = [];
    for (const role of main) {
        if (role.role == 'superadmin') {
            for (const menu of role.menus) {
                if (menu.parent != 0) {
                    sub_menu.push(menu);
                } else {
                    menu_main.push(menu);
                }
            }
        }
    }

    // console.log('business>>>>>::', menu_main, sub_menu);
    res.render('superadmin_home', {
        locale: i18n.getLocale(),
        viewManager: req.session.passport.user, languages: language,
        menus: menu_main, sub_menu: sub_menu,
    });
});
router.get('/navigation', async (req, res) => {
    // let prevelage = req.query.prevelage;
    const control = await new Controllers(req);
    let menuss = await (await control.find()).menus();
    console.log('menus>>>>', menuss);
    res.render('partials/navigation.hbs', { layout: false, menus: menuss });
});

module.exports = router;