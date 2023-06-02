const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const teachers = require("../../../database/models/teachers");
const fs = require('fs');
const { enrols } = require("../models/updates");
const Controllers = require("../models/control");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        let classes = await (await control.find()).classes();
        res.render('superadmin/teachers/index', { layout: false, classes: classes });
    },
    list: async (req, res) => {

        const control = await new Controllers(req);
        let teachers = JSON.parse(JSON.stringify(await (await control.findBy()).teacher({ where: { schoolId: 1 }, include: [{ model: users }] })));
        console.log("teachers", teachers);
        res.render('superadmin/teachers/list', { layout: false, teachers: teachers });
    },

    profile: async (req, res) => {

        const control = await new Controllers(req);
        let teachers = await (await control.single()).enrols(await (await control._request).params.id);
        console.log(teachers);
        res.render('superadmin/teachers/profile', { layout: false, enrol: teachers });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url == '/create') {
            // let schools = await finds.schools();
            let department = await (await control.find()).departments();
            let classes = await (await control.find()).classes();
            res.render('superadmin/teachers/create', { layout: false, departments: department, classes: classes });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                if (req.file) {
                    try {
                        console.log('its post:');
                        let data = req.body;
                        data.role = 'teacher';
                        data.schoolId = 1;
                        data.social_link = JSON.stringify([data.facebook_link, data.twitter_link, data.linkedin_link])
                        await (await control.create()).teacher(data);
                        res.json({ status: true, notification: 'successfully added teacher!' })
                    } catch (err) {
                        res.json({ status: false, notification: 'failed to add teacher: ' + err.message })
                    }
                }

            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let teachers = await (await control.single()).teacher(req.params.id);
            let departments = await (await control.find()).departments();
            console.log(teachers);
            res.render('superadmin/teachers/edit', { layout: false, teacher: teachers, departments: departments });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    let teacher = await (await control.single()).teacher(req.params.id);
                    data.social_link = JSON.stringify([data.facebook_link, data.twitter_link, data.linkedin_link])
                    await (await control.update()).user(teacher.user.id, data);
                    await (await control.update()).teacher(teacher.id, data);
                    res.json({ status: true, notification: 'successfully updated teacher!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update teacher: ' + err.message })
                }
            }
        }

    },

    permissionOverview: async (req, res) => {

        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/permission_overview')) {
            try {
                let teacher = await (await control.find()).teacher_permissions(req.params.teacher);
                let user = await (await control.single()).user(req.params.user);
                console.log();
                res.render('superadmin/teachers/permission_overview', { layout: false, teacher_permissions: teacher, user: user });
            } catch (err) {
                console.log(err);
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    let teacher = await (await control.single()).teacher(req.params.id);
                    data.social_link = JSON.stringify([data.facebook_link, data.twitter_link, data.linkedin_link])
                    await (await control.update()).user(teacher.user.id, data);
                    await (await control.update()).teacher(teacher.id, data);
                    res.json({ status: true, notification: 'successfully updated teacher!' });
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update teacher: ' + err.message })
                }
            }
        }

    }
}