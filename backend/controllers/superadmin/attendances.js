
const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const classes = require("../../../database/models/classes");
const sections = require("../../../database/models/sections");
const students = require("../../../database/models/students");
const Controllers = require("../models/control");
let _many_module = 'schools';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        let classes = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).class({ where: { schoolId: 1 } })));
        res.render('superadmin/attendances/index', { layout: false, classes: classes });
    },
    list: async (req, res) => {
        console.log(req.body);
        let starter = new Date();
        starter.setFullYear(req.body.year);
        starter.setMonth(req.body.month);
        starter.setDate(1);

        let ender = new Date();
        ender.setFullYear(req.body.year);
        ender.setMonth(req.body.month);
        ender.setDate(31);
        let attendances = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).attendance({ where: { classId: req.body.classId, sectionId: req.body.sectionId, timestamp: { [Op.between]: [starter.toISOString(), ender.toISOString()] } }, include: [{ model: students, include: { model: users } }] })));
        console.log(attendances);
        res.render('superadmin/attendances/list', { layout: false, attendances: attendances });
    },
    take_attendace: async (req, res) => {
        if (req.method == 'GET' && req.url == '/take_attendance') {
            try {
                let classes = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).class({ where: { schoolId: 1 } })));
                res.render('superadmin/attendances/take_attendance', { layout: false, classes: classes });

            } catch (err) {
                console.log(err);
                throw err;
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/take_attendance')) {
                try {
                    let data = req.body;
                    if (data != undefined) {
                        console.log('its post:', req.body);
                        data.schoolId = 1;
                        data.sessionId = 1;

                        let dater = `${data.date.split('/')[2]}-${data.date.split('/')[0]}-${data.date.split('/')[1]}`;
                        for (let i = 0; i < data.studentId.length; i++) {
                            let dt = {
                                studentId: data.studentId[i],
                                status: data['status-' + data.studentId[i]],
                                timestamp: dater,
                                classId: data.classId,
                                sectionId: data.sectionId,
                                schoolId: 1,
                                sessionId: 1
                            }
                            console.log('its post:', req.body);
                            await (await new Controllers(req).create()).attendance(dt);
                        }
                        res.json({ status: true, notification: 'successfully added attendance!' })
                    } else {
                        console.log('error');
                        res.json({ status: false, notification: 'failed to add attendance: no data provided!' });

                    }
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to add attendance: ' + err.message })
                }
            }
        }
    },
    student: async (req, res) => {


        if (req.method == 'POST' && req.url.includes('/students')) {
            try {
                let data = req.body;
                console.log('its post:');
                let enrol = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).enrol({ where: { classId: req.body.classId, sectionId: req.body.sectionId }, include: [{ model: students, include: { model: users } }] })));

                let newEnrol = [];
                for (var i = 0; i < enrol.length; i++) {
                    // console.log('enrols', data, enr);
                    var date = new Date();
                    console.log(data.date.split('/')[2], data.date.split('/')[1], data.date.split('/')[0]);
                    var dater = `${data.date.split('/')[2]}-${data.date.split('/')[0]}-${data.date.split('/')[1]}`;
                    date.setMonth(data.date.split('/')[0] - 1)
                    date.setDate(data.date.split('/')[1] - 1)
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    console.log('enrols1', enrol[i]);
                    console.log('enrols2', dater);
                    let att = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).attendance({ where: { classId: enrol[i].classId, studentId: enrol[i].studentId } })));
                    enrol[i]["attendances"] = [];
                    for (const attend of att) {
                        if (attend.timestamp == dater) {
                            console.log('attendance::::;;', attend);
                            enrol[i]["attendances"].push(attend);
                        }
                    }
                    (att == null) ? att = [] : att;
                    newEnrol.push(enrol[i]);
                }
                console.log('enrol::', newEnrol);
                res.render('superadmin/attendances/student', { layout: false, enrols: JSON.parse(JSON.stringify(await newEnrol)) })

            } catch (err) {
                res.json({ status: false, notification: 'failed to update attendance: ' + err.message })
            }
        }

    },
    // teachersList: async (req, res) => {
    //     try {

    //         let teachers = JSON.parse(JSON.stringify(await finds.teachers()));
    //         let teachers_permissions = [];
    //         for (const teacher in teachers) {
    //             teachers[teacher]['permissions'] = JSON.parse(JSON.stringify(await (await new Controllers(req).single()).teacher_permissions({ where: { teacherId: teachers[teacher].id, classId: req.params.class, sectionId: req.params.section }, include: [{ model: classes }, { model: sections }] })));
    //             teachers_permissions.push(teachers[teacher]);
    //         }
    //         console.log(teachers_permissions);
    //         res.render('superadmin/permissions/list', { layout: false, permissions: JSON.parse(JSON.stringify(teachers_permissions)) });
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // },

    filter: async (req, res) => {
        try {
            let start = 1;
            let end = 30
            var d = `${req.body.year}-${req.body.month}-${start} 00:00:00`;
            var dt = `${req.body.year}-${req.body.month}-${end} 23:59:59`;
            var timestampLoop = [];
            var timestampLoop2 = [];
            var enrolments = await (await new Controllers(req).findBy()).enrol({ where: { classId: req.body.classId, sectionId: req.body.sectionId }, include: [{ model: students, include: { model: users } }, { model: classes }, { model: sections }] });
            enrolments = JSON.parse(JSON.stringify(await enrolments));
            let mmonthData = { timestamp: [], class_attendance: [] };
            for (let i = start; i <= end; i++) {
                var loopDate1 = `${req.body.year}-${req.body.month}-${i}`;
                mmonthData.timestamp.push(loopDate1)
            }
            for (var enr of enrolments) {
                enr['attendances'] = [];
                for (let i = start; i <= end; i++) {
                    console.log('length of I>>>>>>>>>', i.toString().length);
                    var loopDate = `${req.body.year}-${req.body.month}-${(i.toString().length <= 1) ? '0' + i : i}`;
                    var loopDate11 = `${loopDate} 00:00:00`;
                    var loopDate22 = `${loopDate} 23:59:59`;
                    let attendances = await (await new Controllers(req).single()).attendances({ where: { studentId: enr.student.id, timestamp: { [Op.between]: [loopDate11, loopDate22] } } });

                    attendances = JSON.parse(JSON.stringify(attendances));
                    console.log('attendance<==>', attendances, loopDate11);
                    if (attendances != null) {
                        if (new Date(attendances.timestamp).toLocaleDateString() == new Date(loopDate).toLocaleDateString()) {
                            enr.attendances.push(attendances);
                        } else {
                            enr['attendances'].push({ status: '#', timestamp: loopDate });
                        }
                    } else {
                        enr['attendances'].push({ status: '#', timestamp: loopDate });
                    }


                }
                mmonthData.class_attendance.push(enr);

            }
            // console.log('attendance<==>', ...mmonthData.class_attendance);
            res.render('superadmin/attendances/list', { layout: false, monthData: mmonthData })

        } catch (err) {
            // res.render('superadmin/sections/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }

    },

    sections: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/sections')) {
            try {

                let _class = JSON.parse(JSON.stringify(await (await new Controllers(req).single()).class(req.params.id)));
                let ccl = await JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).section({ where: { classId: _class.id } })));
                _class['sections'] = ccl;
                let count = ccl.length;

                console.log(_class);
                res.render('superadmin/attendances/sections', { layout: false, class: _class, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load sections: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/sections')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).update()).section(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated class sections!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update class sections: ' + err.message })
                }
            }
        }
    },
}