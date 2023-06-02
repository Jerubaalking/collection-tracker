const { Op } = require("../../../database/mysql");
// const schools = require("../../../database/models/schools");
// const sections = require("../../../database/models/sections");
// const vehicles = require("../../../database/models/vehicles");
const { getPayload } = require('./getPayload');
const Controllers = require("../models/control");
const { businesses, users} = require("../../../database/models/module_exporter");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/stores/index', { layout: false });
    },
    list: async (req, res) => {

        let stores = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).store({ where: { businessId: (req.body.businessId) ? req.body.businessId : null }, include: { model: businesses } })));
        console.log('stores_stores::::', stores);
        res.render('superadmin/stores/list', { layout: false, stores: stores });
    },
    create: async (req, res) => {
        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/stores/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    let payload = await getPayload(req);
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).create()).store(data);
                    res.json({ status: true, notification: 'successfully added admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            const control = await new Controllers(req);
            let route = await (await control.single()).store(req.params.id);
            res.render('superadmin/stores/edit', { layout: false, store: route });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    const control = await new Controllers(req);
                    console.log('its post:');
                    let data = req.body;
                    data.sessionId = await (await control.getCurrentSession()).sessionId;
                    data.schoolId = await (await control.getCurrentSession()).schoolId;
                    await (await control.update()).store(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated admin!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update admin: ' + err.message })
                }
            }
        }
        return;

    },

    // storeSection: async (req, res) => {
    //     try {
    //         let ans = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).section({ where: { storeId: 1 } })));
    //         console.log('ans', await ans, req.url);
    //         res.render('superadmin/stores/listByClassOptions', { layout: false, stores: await ans })
    //     } catch (err) {
    //         // res.render('superadmin/stores/listByClassOptions', { layout: false, sessions: err.message })
    //         throw err;
    //     }
    //     return;

    // },

    // sections: async (req, res) => {

    //     if (req.method == 'GET' && req.url.includes('/sections')) {
    //         try {
    //             const control = await new Controllers(req);
    //             let store = await (await control.single()).store(req.params.id);
    //             // let ccl = await (await control.findBy()).section({ where: { storeId: store.id } });
    //             // store['sections'] = ccl;
    //             // let count = ccl.length;

    //             // console.log(bus);
    //             res.render('superadmin/stores/sections', { layout: false, store: store, count: count });
    //         } catch (err) {
    //             res.json({ status: false, notification: 'failed to load sections: ' + err.message })
    //         }
    //     } else {
    //         if (req.method == 'POST' && req.url.includes('/sections')) {
    //             try {
    //                 console.log('its post:');
    //                 let data = req.body;
    //                 await update.section(req.params.id, data);
    //                 res.json({ status: true, notification: 'successfully updated bus sections!' })
    //                 return;
    //             } catch (err) {
    //                 res.json({ status: false, notification: 'failed to update bus sections: ' + err.message })
    //             }
    //         }
    //     }
    // },
}