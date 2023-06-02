const classes = require("../../../database/models/classes");
const sections = require("../../../database/models/sections");
const Controllers = require("../models/control");
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        const control = await new Controllers(req);
        let classes = await (await control.find()).classes();
        let sections = await (await control.find()).sessions();

        res.render('superadmin/permissions/index', { layout: false, sections: sections, classes: classes });
    },
    list: async (req, res) => {
        let teachers_permissions = JSON.parse(JSON.stringify(await (await control.findBy()).teachers_permissions({ where: { classId: req.params.class, sectionId: req.params.section }, include: [{ model: classes }, { model: sections }] })));
        console.log(teachers_permissions);
        res.render('superadmin/permissions/list', { layout: false, permissions: teachers_permissions });
    },
    teachersList: async (req, res) => {
        try {
            const control = await new Controllers(req);
            let teachers = await (await control.find()).teachers();
            let teachers_permissions = [];
            for (const teacher in teachers) {
                teachers[teacher]['permissions'] = await (await control.single()).teacher_permissions({ where: { teacherId: teachers[teacher].id, classId: req.params.class, sectionId: req.params.section }, include: [{ model: classes }, { model: sections }] });
                teachers_permissions.push(teachers[teacher]);
            }
            console.log(teachers_permissions);
            res.render('superadmin/permissions/list', { layout: false, permissions: JSON.parse(JSON.stringify(teachers_permissions)) });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/session/create', { layout: false });
        } else {
            if (req.method == 'POST' && rreq.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await creates.session(data);
                    res.json({ status: true, notification: 'successfully added session!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add session: ' + err.message })
                }
            }
        }

    },
    modify: async (req, res) => {
        let dat = req.body;
        try {
            const control = await new Controllers(req);
            let old = await (await control.single()).teacher_permissions({ where: { classId: req.body.classId, sectionId: req.body.sectionId, teacherId: req.body.teacherId } });
            console.log('req body:::', dat, old);
            if (old) {
                let perm = await (await control.update()).teacher_permissions({ [req.body.column_name]: req.body.value }, { where: { classId: req.body.classId, sectionId: req.body.sectionId, teacherId: req.body.teacherId } });
                perm = JSON.parse(JSON.stringify(perm));
                res.json({ status: true, notification: 'successfully updated permission!' })
                return this.teachersList;
            } else {
                let data;
                if (dat.column_name == 'marks') {
                    data = {
                        sectionId: req.body.sectionId,
                        classId: req.body.classId,
                        teacherId: req.body.teacherId,
                        marks: 1
                    }
                }
                if (dat.column_name == 'assignment') {
                    data = {
                        sectionId: req.body.sectionId,
                        classId: req.body.classId,
                        teacherId: req.body.teacherId,
                        assignment: 1
                    }
                }
                if (dat.column_name == 'attendance') {
                    data = {
                        sectionId: req.body.sectionId,
                        classId: req.body.classId,
                        teacherId: req.body.teacherId,
                        attendance: 1
                    }
                }
                if (dat.column_name == 'online_exams') {
                    data = {
                        sectionId: req.body.sectionId,
                        classId: req.body.classId,
                        teacherId: req.body.teacherId,
                        online_exams: 1
                    }
                }
                let perm = await (await control.create()).teacher_permissions(data);
                perm = JSON.parse(JSON.stringify(await perm));
                res.json({ status: true, notification: 'successfully altered permission!' })

            }
        } catch (err) {
            console.log(err);
            res.json({ status: false, notification: 'failed to modified permission! ' + err });

        }

    },

    activateSession: async (req, res) => {
        try {
            let oldSession = JSON.parse(JSON.stringify(await findby.session({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await update.session(oldSession[0].id, { status: 0 });
            }
            await update.session(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated session!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate session: ' + err.message })
        }

    }
}