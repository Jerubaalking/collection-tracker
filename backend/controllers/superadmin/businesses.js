const update = require("../models/updates");
const creates = require("../models/creates");
const finds = require("../models/finds");
const single = require("../models/single");
const findby = require("../models/findBy");
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
let _many_module = 'businesses';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/businesses/index', { layout: false });
    },
    list: async (req, res) => {

        let businesses = await (await new Controllers(req).findBy()).business({});
        console.log('business>>>>>>>>>:', businesses);
        res.render('superadmin/businesses/list', { layout: false, businesses: businesses });

    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/businesses/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    if (req.files) {
                        let data = req.body;
                        for (const file of req.files) {
                            if (process.env.NODE_ENV  == 'production') {
                                console.log('File==>>>>', file);
                                if (file.fieldname == 'business_logo') {
                                    data['logo'] = file.key.split('public')[1];
                                }
                                if (file.fieldname == 'business_stamp') {
                                    data['stamp'] = file.key.split('public')[1];
                                }
                            } else {
                                console.log('File==>>>>', file);
                                if (file.fieldname == 'business_logo') {
                                    data['logo'] = file.path.split('public')[1];
                                }
                                if (file.fieldname == 'business_stamp') {
                                    data['stamp'] = file.path.split('public')[1];
                                }
                            }
                        }
                        console.log('its post:', data);
                        await (await new Controllers(req).create()).business(data);
                        res.json({ status: true, notification: 'successfully added business!' });
                    } else {
                        if (req.file) {
                            if (process.env.NODE_ENV  == 'production') {
                                if (req.file.fieldname == 'business_logo') {
                                    data['logo'] = req.file.key.split('public')[1];
                                }
                                if (req.file.fieldname == 'business_stamp') {
                                    data['stamp'] = req.file.key.split('public')[1];
                                }
                            } else {

                                if (req.file.fieldname == 'business_logo') {
                                    data['logo'] = req.file.path.split('public')[1];
                                }
                                if (req.file.fieldname == 'business_stamp') {
                                    data['stamp'] = req.file.path.split('public')[1];
                                }
                            }

                            console.log('its post:', data);
                            await (await new Controllers(req).create()).business(data);
                            res.json({ status: true, notification: 'successfully added business!' });
                        }
                    }
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add business: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let business = await (await new Controllers(req).single()).business(req.params.id);
            console.log(business);
            res.render('superadmin/businesses/edit', { layout: false, business: JSON.parse(JSON.stringify(business)) });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit'+req.params.id)) {
                try {
                    console.log('its post:');
                    if (req.files) {
                        let data = req.body;
                        for (const file of req.files) {
                            console.log(file);
                            if (process.env.NODE_ENV  == 'production') {
                                if (file.fieldname == 'business_logo') {
                                    data['logo'] = file.key.split('public')[1];
                                }
                                if (file.fieldname == 'business_stamp') {
                                    data['stamp'] = file.key.split('public')[1];
                                }
                            } else {

                                if (file.fieldname == 'business_logo') {
                                    data['logo'] = file.path.split('public')[1];
                                }
                                if (file.fieldname == 'business_stamp') {
                                    data['stamp'] = file.path.split('public')[1];
                                }
                            }
                        }
                        console.log('its post:', data);
                        await (await new Controllers(req).update()).business(req.params.id, data);
                        res.json({ status: true, notification: 'successfully updated business!' });
                    } else {
                        if (req.file) {
                            if (process.env.NODE_ENV == 'production') {
                                if (req.file.fieldname == 'business_logo') {
                                    data['logo'] = req.file.key.split('public')[1];
                                }
                                if (req.file.fieldname == 'business_stamp') {
                                    data['stamp'] = req.file.key.split('public')[1];
                                }
                            } else {

                                if (req.file.fieldname == 'business_logo') {
                                    data['logo'] = req.file.path.split('public')[1];
                                }
                                if (req.file.fieldname == 'business_stamp') {
                                    data['stamp'] = req.file.path.split('public')[1];
                                }
                            }
                            console.log('its post:', data);
                            await (await new Controllers(req).update()).business(req.params.id, data);
                            res.json({ status: true, notification: 'successfully added business!' });
                        } else {
                            await (await new Controllers(req).update()).business(req.params.id, data);
                            res.json({ status: true, notification: 'successfully added business!' });
                        }
                    }
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update business: ' + err.message })
                }
            }
        }

    },

    activateSession: async (req, res) => {
        try {
            let oldSession = JSON.parse(JSON.stringify(await findby.business({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await update.business(oldSession[0].id, { status: 0 });
            }
            await update.business(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated business!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate business: ' + err.message })
        }

    }
}