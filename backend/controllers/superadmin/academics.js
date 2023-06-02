const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const sections = require("../../../database/models/sections");
const deletes = require("../models/deletes");
const Controllers = require("../models/control");
const students = require("../../../database/models/students");
const classes = require("../../../database/models/classes");
const exams = require("../../../database/models/exams");
const subjects = require("../../../database/models/subjects");
const sessions = require("../../../database/models/sessions");
const fs = require('fs');
const path = require('path');
const { makePDF } = require("../services/pdfHandle");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        console.log('req', req.url);
        let enrols = await (await control.findBy()).enrol({ where: {}, include: [{ model: students, include: { model: users } }, { model: classes }] });
        res.render('superadmin/reports/academics/index', { layout: false, enrols: enrols });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        console.log(req.body);
        let data = req.body;
        let enrol = await (await control.findBy()).enrol({ where: { studentId: req.body.studentId }, include: [{ model: students, include: { model: users } }, { model: sections }, { model: classes }, { model: sessions }] });

        let subjectss = await (await control.find()).subjects();
        let subj = [];
        var subCount = 0;
        var mrks = 0;
        for (const subject of subjectss) {
            let examz = await (await control.find()).exams();
            let exm = [];
            for (const ex of examz) {
                ex['marks'] = await (await control.findBy()).mark({ where: { studentId: data.studentId, examId: ex.id, subjectId: subject.id, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: exams }, { model: classes }, { model: subjects }, { model: sections }] });
                for (const mk of ex.marks) {
                    mrks += parseInt(mk.marks_obtained)
                }
                subCount += 1;
                exm.push(ex);
            }
            subject['average'] = (mrks / subCount).toFixed(0);
            let gg = await (await control.findBy()).grade({ where: { marks_from: { [Op.lte]: `${subject.average}` }, marks_to: { [Op.gte]: `${subject.average}` } } });
            console.log('grade::::::::', await gg[0]);
            gg = await gg[0];
            (gg == undefined) ? subject['grade'] = 'F' : subject['grade'] = gg.name;
            subject['exams'] = exm;
            subj.push(subject);
        }
        // let syllabus = JSON.parse(JSON.stringify(await (await control.findBy()).syllabus({ where: { schoolId: 1, classId: req.params.class, sectionId: req.params.section } })));
        // console.log(subj);
        data['url'] = process.env.HTTPSSITE;
        res.render('superadmin/reports/academics/list', { layout: false, subjects: subj, enrol: enrol[0], body: data });
    },
    export: async (req, res) => {
        const control = await new Controllers(req);
        let data = await (await control.getParams());
        let cookie = req.cookies;
        console.log(data);
        try {
            if (data.type == 'pdf') {
                let opt = {};
                opt.limit = 29;
                opt.page = 1;
                opt.pages = 1;
                let make = await makePDF({ data: [data], opt, cookies: cookie }, '/academics/pdf', opt.pages);
                // console.log("MAKE>>>>>>>>>>>>", make);

                if (make) {
                    make.maker.end(async () => {
                        try {
                            await fs.statSync(make.info.path);
                            make.maker.emit('close');
                        } catch (err) {
                            make.maker.emit('end');
                        }
                    });
                    make.maker.on('close', async () => {

                        // Streamer.once('open', async () => {
                        if (fs.existsSync(make.info.path)) {
                            const Streamer = fs.createReadStream(make.info.path);
                            console.log('am here at cose >>>>>>....', make.info.path);
                            console.log('am here at cose >>>>>>....');
                            let tempHTML = path.resolve(path.basename('./') + '/backend/catch/html/temp.html');
                            console.log('am here already!');
                            let stat = fs.statSync(make.info.path);
                            res.setHeader('Content-length', stat.size);
                            res.setHeader('Content-type', 'application/pdf');
                            res.setHeader('Content-Disposition', `inline;filename=${make.info.name}`);
                            Streamer.pipe(res);
                        }

                    });
                }
            }
            if (data.type == 'csv') {
                let cclass = await (await control.single()).class(data.classId);
                let invoices = null;
                if (data.status == 'all') {
                    if (data.classId == 'all') {
                        cclass = [];
                        invoices = await (await control.findBy()).invoice({ where: { schoolId: await (await control.getCurrentSession()).schoolId, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: students, include: { model: users } }, { model: classes }] });
                    } else {

                        invoices = await (await control.findBy()).invoice({ where: { schoolId: await (await control.getCurrentSession()).schoolId, classId: cclass.id, status: data.status, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: students, include: { model: users } }, { model: classes }] });
                    }
                } else {
                    if (data.classId == 'all') {
                        cclass = [];
                        invoices = await (await control.findBy()).invoice({ where: { schoolId: await (await control.getCurrentSession()).schoolId, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: students, include: { model: users } }, { model: classes }] });
                    } else {
                        invoices = await (await control.findBy()).invoice({ where: { schoolId: await (await control.getCurrentSession()).schoolId, classId: cclass.id, status: data.status, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: students, include: { model: users } }, { model: classes }] });
                    }

                }
                for (const inv of invoices) {
                    inv['balance'] = parseFloat(inv.total_amount) - parseFloat(inv.paid_amount);

                }
                let csvname = 'students_invoice_' + data.start + 'to' + data.end + '.' + data.type;
                csvPath = path.resolve(path.basename('./') + '/backend/catch/csv/' + csvname);
                let csvWriter = fs.createWriteStream(csvPath);
                csvWriter.once('open', async () => {
                    csvWriter.once('ready', async () => {
                        console.log('am ready');
                        await csvWriter.write(`TITLE, STUDENT,TOTAL AMOUNT, PAID AMOUNT, CREATE DATE, PAYMENT DATE\r`);
                        for (const inv of invoices) {
                            await csvWriter.write(`${inv.title},${inv.student.user.name},${inv.total_amount},${inv.paid_amount},${inv.createdAt},${inv.updatedAt}\r`);
                        }
                        await csvWriter.end(async () => {
                            let stat = await fs.statSync(csvPath);
                            await res.setHeader('Content-length', await stat.size);
                            await res.setHeader('Content-type', 'application/csv');
                            await res.setHeader('Content-Disposition', `attachment;filename=${csvname}`);
                            let reader = fs.createReadStream(csvPath);
                            reader.pipe(res).on('finish', () => {
                                fs.unlinkSync(csvPath);
                            });
                        });
                    });
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    pdf: async (req, res) => {

        const control = await new Controllers(req);
        let data = await (await control.getParams());
        console.log(data);
        let enrol = await (await control.findBy()).enrol({ where: { studentId: data.studentId }, include: [{ model: students, include: { model: users } }, { model: sections }, { model: classes }, { model: sessions }] });

        let subjectss = await (await control.find()).subjects();
        let subj = [];
        var subCount = 0;
        var mrks = 0;
        let days = Math.ceil(Math.abs(new Date(data.start) - new Date(data.end)) / (1000 * 60 * 60 * 24));
        let months = Math.ceil(Math.abs(new Date(data.start) - new Date(data.end)) / (1000 * 60 * 60 * 24 * 30));
        days = days - (months * 8);
        
        console.log(days, months);
        for (const subject of subjectss) {
            let examz = await (await control.find()).exams();
            let exm = [];
            for (const ex of examz) {
                ex['marks'] = await (await control.findBy()).mark({ where: { studentId: data.studentId, examId: ex.id, subjectId: subject.id, createdAt: { [Op.between]: [data.start, data.end] } }, include: [{ model: exams }, { model: classes }, { model: subjects }, { model: sections }] });
                for (const mk of ex.marks) {
                    mrks += parseInt(mk.marks_obtained)
                }
                subCount += 1;
                exm.push(ex);
            }
            subject['average'] = (mrks / subCount).toFixed(0);
            let gg = await (await control.findBy()).grade({ where: { marks_from: { [Op.lte]: `${subject.average}` }, marks_to: { [Op.gte]: `${subject.average}` } } });
            // console.log('grade::::::::', await gg[0]);
            gg = await gg[0];
            (gg == undefined) ? subject['grade'] = 'F' : subject['grade'] = gg.name;
            subject['exams'] = exm;
            subj.push(subject);
        }
        data['url'] = path.resolve(path.basename('./'));
        res.render('superadmin/reports/academics/report', { layout: false, subjects: subj, enrol: enrol[0], body: data });
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
            res.render('superadmin/reports/academics/dropdown', { layout: false, syllabus: await ans })
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
                res.render('superadmin/reports/academics/sections', { layout: false, class: _class, count: count });
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