const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const salaries = require("../../../database/models/salaries");
const fs = require('fs');
const { enrols } = require("../models/updates");
const Controllers = require("../models/control");
const deductions = require("../../../database/models/deductions");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        let users = await (await control.find()).users();
        res.render('superadmin/salaries/index', { layout: false, users: users });
    },
    list: async (req, res) => {

        const control = await new Controllers(req);
        let salariess = JSON.parse(JSON.stringify(await (await control.findBy()).salaries({ where: { schoolId: 1 }, include: [{ model: users }] })));
        let salaries = [];
        for (const salary of salariess) {
            let deductionss = await (await control.findBy()).deduction_charts({ where: { salaryId: salary.id }, include: { model: deductions } });
            let dedTotalAmount = 0;
            let take_home = 0;
            for (const ded of deductionss) {
                console.log("salaries", ded);
                dedTotalAmount += (parseFloat(salary.amount) * (parseFloat(ded.deduction.percent) / 100));
            }

            salary['take_home'] = parseFloat(salary.amount) - dedTotalAmount;
            salary['total_deductions'] = dedTotalAmount;
            salary['deductions'] = deductionss;
            salaries.push(salary)
        }
        // console.log("salaries", salaries);
        res.render('superadmin/salaries/list', { layout: false, salaries: salaries });
    },

    profile: async (req, res) => {

        const control = await new Controllers(req);
        let salaries = await (await control.single()).enrols(await (await control._request).params.id);
        console.log(salaries);
        res.render('superadmin/salaries/profile', { layout: false, enrol: salaries });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url == '/create') {
            // let schools = await finds.schools();
            let deductions = await (await control.find()).deductions();
            let teachers = await (await control.find()).teachers();
            res.render('superadmin/salaries/create', { layout: false, deductions: deductions, teachers: teachers });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                // if (req.file) {
                try {
                    let data = req.body;
                    data.userId = data.employeeId;
                    console.log('its post:', data);
                    let salary = await (await control.create()).salary(data);
                    for (let ded in data.checkId) {
                        data.salaryId = salary.id;
                        data.deductionId = ded;
                        await (await control.create()).deduction_charts(data);
                    }
                    res.json({ status: true, notification: 'successfully added salary! waiting approval' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add salary: ' + err.message })
                }
                // }

            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let salaries = await (await control.single()).salary(req.params.id);
            let teachers = await (await control.find()).teachers();
            console.log(salaries);
            res.render('superadmin/salaries/edit', { layout: false, salary: salaries, teachers: teachers });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    let salarie = await (await control.single()).salaries(req.params.id);
                    data.social_link = JSON.stringify([data.facebook_link, data.twitter_link, data.linkedin_link])
                    await (await control.update()).user(salarie.user.id, data);
                    await (await control.update()).salaries(salarie.id, data);
                    res.json({ status: true, notification: 'successfully updated salarie!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update salarie: ' + err.message })
                }
            }
        }

    },

    permissionOverview: async (req, res) => {

        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/permission_overview')) {
            try {
                let salarie = await (await control.find()).salarie_permissions(req.params.salarie);
                let user = await (await control.single()).user(req.params.user);
                console.log();
                res.render('superadmin/salaries/permission_overview', { layout: false, salarie_permissions: salarie, user: user });
            } catch (err) {
                console.log(err);
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    let salarie = await (await control.single()).salaries(req.params.id);
                    data.social_link = JSON.stringify([data.facebook_link, data.twitter_link, data.linkedin_link])
                    await (await control.update()).user(salarie.user.id, data);
                    await (await control.update()).salaries(salarie.id, data);
                    res.json({ status: true, notification: 'successfully updated salarie!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update salarie: ' + err.message })
                }
            }
        }

    }
}