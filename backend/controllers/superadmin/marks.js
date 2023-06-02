
const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const sections = require("../../../database/models/sections");
const students = require("../../../database/models/students");
const Controllers = require("../models/control");
module.exports = {
    index: async (req, res) => {
        try {
            const control = await new Controllers(req);
            let exams = await (await control.find()).exams();
            let subjects = await (await control.find()).subjects();
            let classes = await (await control.find()).classes()
            res.render('superadmin/marks/index', { layout: false, subjects: subjects, classes: classes, exams: exams });

        } catch (err) {
            console.log(err);
        }
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let exams = await (await control.single()).exam(req.body.examId);
        let subjects = await (await control.single()).subject(req.body.subjectId);
        let sections = await (await control.single()).section(req.body.sectionId);
        let classes = await (await control.single()).class(req.body.classId);
        let enrolss = JSON.parse(JSON.stringify(await (await control.findBy()).enrol({ where: { classId: req.body.classId, sectionId: req.body.sectionId, schoolId: 1, sessionId: 1 } })));
        for (const stud of enrolss) {
            let marks = JSON.parse(JSON.stringify(await (await control.findBy()).mark({ where: { studentId: stud.studentId, classId: stud.classId, examId: req.body.examId, subjectId: req.body.subjectId, sectionId: stud.sectionId, } })));
            let studd = await (await control.single()).student(stud.studentId);
            if (marks.length > 0) {

                let grades = await (await control.findBy()).grade({ where: { schoolId: await (await control.getCurrentSession()).schoolId, sessionId: await (await control.getCurrentSession()).sessionId, marks_from: { [Op.lte]: marks[0].marks_obtained }, marks_to: { [Op.gte]: marks[0].marks_obtained } } });
                stud['marks'] = marks[0];
                stud.marks['grade'] = grades[0];
            } else {
                stud['marks'] = marks[0];
            }
            stud['student'] = studd;
        }
        console.log(enrolss);
        res.render('superadmin/marks/list', { layout: false, subject: subjects, section: sections, class: classes, exam: exams, students: enrolss });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/marks/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    const control = await new Controllers(req);
                    let data = req.body;
                    await (await control.create()).mark(data);
                    res.json({ status: true, notification: 'successfully added grade!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add grade: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            const control = await new Controllers(req);
            let grade = await (await control.single()).mark(req.params.id);
            res.render('superadmin/marks/edit', { layout: false, grade: grade });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    const control = await new Controllers(req);
                    let marks = JSON.parse(JSON.stringify(await (await control.findBy()).mark({ where: { classId: req.body.classId, examId: req.body.examId, subjectId: req.body.subjectId, sectionId: req.body.sectionId, studentId: req.body.studentId, sessionId: await (await control.getCurrentSession()).sessionId } })));
                    console.log('its post:');
                    if (marks.length <= 0) {
                        let data = req.body;
                        await (await control.create()).mark(data);
                        res.json({ status: true, notification: 'successfully updated grade!' })
                    } else {
                        let data = req.body;

                        await (await control.update()).mark(marks[0].id, data);
                        res.json({ status: true, notification: 'successfully updated grade!' })
                    }
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update grade: ' + err.message })
                }
            }
        }
        return;

    },

    classSection: async (req, res) => {
        try {
            const control = await new Controllers(req);
            let ans = JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: 1 } })));
            console.log('ans', await ans, req.url);
            res.render('superadmin/marks/listByClassOptions', { layout: false, marks: await ans })
        } catch (err) {
            // res.render('superadmin/marks/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },

    sections: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/sections')) {
            try {

                const control = await new Controllers(req);
                let _class = JSON.parse(JSON.stringify(await (await control.single()).class(req.params.id)));
                let ccl = await JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: _class.id } })));
                _class['sections'] = ccl;
                let count = ccl.length;

                console.log(_class);
                res.render('superadmin/marks/sections', { layout: false, class: _class, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load sections: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/sections')) {
                try {
                    const control = await new Controllers(req);
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).section(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated class sections!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update class sections: ' + err.message })
                }
            }
        }
    },
}