
const item_products = require("../../../database/models/item_products");
const items = require("../../../database/models/items");
const products = require("../../../database/models/products");
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
let _many_module = 'businesses';
let _single_module = 'business';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/products/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let cl = JSON.parse(JSON.stringify(await (await control.findBy()).product({ include: [{ model: items }] })));
        console.log('product', await cl);
        res.render('superadmin/products/list', { layout: false, products: cl });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            const control = await new Controllers(req);
            let items = JSON.parse(JSON.stringify(await (await control.findBy()).item({ where: { isService: 0 } })));
            let currencies = JSON.parse(JSON.stringify(await (await control.findBy()).currency()));
            res.render('superadmin/products/create', { layout: false, items: items.rows, currencies: currencies, });
        } else {
            console.log('its post:');
            const control = await new Controllers(req);
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    await (await control.create()).niche(req.body);
                    res.json({ status: true, notification: 'successfully added niche!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add niche: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            const control = await new Controllers(req);
            let niche = await (await control.single()).niche(req.params.id);
            res.render('superadmin/products/edit', { layout: false, niche: niche });
            return;
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).niche(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated niche!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update niche: ' + err.message })
                }
            }
        }
        return;

    },
    delete: async (req, res) => {
        if (req.method == 'DELETE') {
            await products.destroy({ where: { id: req.params.id } });
            res.status(200).json({ status: true, notification: "successfully deleted niche!" });
        } else {
            res.status(203).json({ status: false, notification: "not allowed!" });
        }
    }

}