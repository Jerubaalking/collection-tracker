const { Op } = require("../../../database/mysql");
const { users, roles, contacts, addresses, regions, countries, authentications, tasks, schedules } = require("../../../database/models/module_exporter");
const Controllers = require("../controls/control");
const i18n = require("../../helpers/languages/i18n.config");
const uploads = require("../../../database/models/system_properties/uploads");
const fs = require('fs');
const path = require("path");
let _many_module = 'businesses';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/schedules/index', { layout: false, viewManager: req.session.passport.user });
    },
    list: async (req, res) => {
        const control = new Controllers(req);
        let schedule = await (await control.find('schedules'));

        // console.log("user awaited!", userz.data[0].addresses);
        return res.render('superadmin/schedules/list', { layout: false, schedules: schedule, message: "success!" });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let action = '/schedules/create'
            res.render('superadmin/schedules/schedule', { layout: false, action: action });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    (data.skip_holidays) ? data.skip_holidays : data['skip_holidays'] = false;
                    console.log(data);
                    await (await control.create()).save('schedules', data);
                    res.json({ status: true, notification: i18n.__('successfully added') + ' ' + i18n.__('schedule') + '!' });

                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: i18n.__('failed to add') + ' ' + i18n.__('schedule') + ': ' + err })

                }
            }
        }

    },

    edit: async (req, res) => {
        const control = new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let schedule = await (await control.single('schedules', { where: { id: req.params.id } }));
            let action = '/schedules/edit/' + req.params.id;
            console.log(schedule);
            res.render('superadmin/schedules/schedule', { layout: false, schedule: schedule, action: action });
        } else {
            if (req.method == 'POST') {
                try {
                    let data = req.body;
                    // also request data for signups
                    console.log(data);
                    (data.skip_holidays) ? data.skip_holidays : data['skip_holidays'] = false;
                    console.log(data);
                    await (await control.update('schedules', data, { where: { id: req.params.id } }));
                    res.json({ status: true, notification: 'successfully updated schedule!' });
                } catch (err) {
                    res.json({ status: false, notification: i18n.__('failed to update') + ' ' + i18n.__('schedule') + ': ' + i18n.__(err.message) })
                }
            }
        }

    }
}