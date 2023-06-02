const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const sections = require("../../../database/models/sections");
const deletes = require("../models/deletes");
const Controllers = require("../models/control");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        console.log('req', req.url);
        let classes = JSON.parse(JSON.stringify(await (await control.findBy()).class({ where: { schoolId: 1 } })));
        res.render('superadmin/syllabus/index', { layout: false, classes: classes });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let syllabus = JSON.parse(JSON.stringify(await (await control.findBy()).syllabus({ where: { schoolId: 1, classId: req.params.class, sectionId: req.params.section } })));
        console.log(syllabus);
        res.render('superadmin/syllabus/list', { layout: false, syllabuses: syllabus });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let classes = JSON.parse(JSON.stringify(await (await control.findBy()).class({ where: { schoolId: 1 } })));
            res.render('superadmin/syllabus/create', { layout: false, classes: classes });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    if (req.file) {
                        console.log('its post:', req.file);
                        let data = req.body;
                        data.file = (req.file.destination).split('school_system')[1] + (data.title + '.' + (req.file.originalname).split('.')[1]).split(' ').join('_');
                        data.schoolId = 1;
                        data.sessionId = 1;
                        await (await control.create()).syllabus(data);
                        res.json({ status: true, notification: 'successfully added syllabus!' })
                    } else {

                        res.json({ status: false, notification: 'failed to add syllabus: no file!' })
                    }
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add syllabus: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let syllabus = await (await control.single()).syllabus(req.params.id);
            let classes = JSON.parse(JSON.stringify(await (await control.findBy()).class({ where: { schoolId: 1 } })));
            res.render('superadmin/syllabus/edit', { layout: false, classes: classes, syllabus: JSON.parse(JSON.stringify(syllabus)) });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).syllabus(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated syllabus!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update syllabus: ' + err.message })
                }
            }
        }
        return;

    },
    delete: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'DELETE' && req.url.includes('/delete')) {
            let syllabus = await (await control.delete()).syllabus(req.params.id);
            res.json({ status: true, notification: 'successfully deleted syllabus!' })
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.delete()).syllabus(req.params.id, data);
                    res.json({ status: true, notification: 'successfully deleted syllabus!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to delete syllabus: ' + err.message })
                }
            }
        }
        return;
    },

    classSubjects: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let ans = JSON.parse(JSON.stringify(await findby.syllabus({ where: { classId: req.params.class } })));
            console.log('syllabus:', ans);
            res.render('superadmin/syllabus/dropdown', { layout: false, syllabus: await ans })
        } catch (err) {
            // res.render('superadmin/sections/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },

    sections: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/sections')) {
            try {

                let _class = JSON.parse(JSON.stringify(await single.class(req.params.id)));
                let ccl = await JSON.parse(JSON.stringify(await findby.section({ where: { classId: _class.id } })));
                _class['sections'] = ccl;
                let count = ccl.length;

                console.log(_class);
                res.render('superadmin/syllabus/sections', { layout: false, class: _class, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load sections: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/sections')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await update.section(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated class sections!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update class sections: ' + err.message })
                }
            }
        }
    },
}