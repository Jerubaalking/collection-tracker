const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const sections = require("../../../database/models/sections");
const books = require("../../../database/models/books");
const { getPayload } = require('./getPayload');
const students = require("../../../database/models/students");
const classes = require("../../../database/models/classes");
const Controllers = require("../models/control");
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/books/index', { layout: false });
    },
    list: async (req, res) => {

        let bookz = JSON.parse(JSON.stringify(await (await new Controllers(req).find()).books()));
        for (const book of bookz) {
            let currentIssues = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).bookIssue({ where: { schoolId: req.body.schoolId, bookId: book.id, status: 1 } })));
            book['available'] = parseInt(book.copies) - currentIssues.length;
        }


        console.log('books_routes::::', bookz);
        res.render('superadmin/books/list', { layout: false, books: bookz });
    },
    create: async (req, res) => {
        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/books/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    let payload = await getPayload(req);
                    console.log('its post:');
                    let data = req.body;
                    data.sessionId = payload.sessionId;
                    data.schoolId = payload.schoolId;
                    await (await new Controllers(req).create()).book(data);
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
            let books = await (await new Controllers(req).single()).book(req.params.id);
            books = JSON.parse(JSON.stringify(books));
            res.render('superadmin/books/edit', { layout: false, book: books });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    let payload = await new Controllers(req);
                    console.log('its post:');
                    let data = req.body;
                    data.sessionId = await (await payload.getCurrentSession()).sessionId;
                    data.schoolId = await (await payload.getCurrentSession()).schoolId;
                    await (await (payload.update())).book(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated admin!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update admin: ' + err.message })
                }
            }
        }
        return;

    },

    /***
     * BOOKS ISSUE
     */

    issueIndex: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/book_issue/index', { layout: false });
    },
    issueList: async (req, res) => {
        try {
            if (req.method == 'GET' && req.url.includes('/issue/list')) {
                let start = new Date(req.query.start);

                let end = new Date(req.query.end);
                let bookz = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).bookIssue({ where: { schoolId: req.body.schoolId, status: 1, sessionId: req.body.sessionId, issue_date: { [Op.between]: [start.toISOString(), end.toISOString()] } }, include: [{ model: books }, { model: students, include: { model: users } }, { model: classes }] })));

                console.log('books_routes::::', books);
                res.render('superadmin/book_issue/list', { layout: false, book_issues: bookz });
            }
        } catch (err) {
            console.log(err);
            return;
        }

    },
    issueCreate: async (req, res) => {
        if (req.method == 'GET' && req.url == '/issue/create') {
            let subjects = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).subject({ where: { schoolId: 1 } })));
            let classes = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).class({ where: { schoolId: 1 } })));
            let books = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).book({ where: { schoolId: 1 } })));
            res.render('superadmin/book_issue/create', { layout: false, classes: classes, subjects: subjects, books: books });
        } else {
            if (req.method == 'POST' && req.url.includes('/issue/create')) {
                console.log('am here bro');
                try {
                    let payload = await getPayload(req);
                    console.log('its post:');
                    let data = req.body;
                    data.issue_date = new Date(data.issue_date).toISOString();
                    data.sessionId = payload.sessionId;
                    data.schoolId = payload.schoolId;
                    data.status = 1;
                    var old = await (await new Controllers(req).findBy()).bookIssue({ where: { status: 1, bookId: data.bookId, studentId: data.studentId }, include: [{ model: students, include: { model: users } }] });
                    old = JSON.parse(JSON.stringify(old));
                    if (old.length <= 0) {
                        await creates.bookIssue(data);
                        res.json({ status: true, notification: 'successfully issued book to student' })
                    } else {
                        res.json({ status: false, notification: 'failed to issue book! ' + old[0].student.user.name + ' have not returned a copy of the same book issued on ' + new Date((old[0].createdAt).split('T')[0]).toDateString() + '.' })
                    }
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to issue book: ' + err.message })
                }
                return;
            }
        }

    },
    issueEdit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/issue/edit')) {
            let issue = await (await new Controllers(req).single()).bookIssue(req.params.id);
            issue = JSON.parse(JSON.stringify(issue));
            let control = await new Controllers(req);
            let ses = await control.getCurrentSession();
            let classes = JSON.parse(JSON.stringify(await (await control.findBy()).class({ where: { schoolId: 1 } })));
            let books = JSON.parse(JSON.stringify(await (await control.findBy()).book({ where: { schoolId: 1 } })));
            console.log();
            res.render('superadmin/book_issue/edit', { layout: false, classes: classes, books: books, book_issue: issue });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    let payload = await getPayload(req);
                    console.log('its post:');
                    let data = req.body;
                    data.sessionId = payload.sessionId;
                    data.schoolId = payload.schoolId;
                    await (await new Controllers(req).update()).book(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated admin!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update admin: ' + err.message })
                }
            }
        }
    },
    issueReturn: async (req, res) => {
        try {

            if (req.method == 'DELETE' && req.url.includes('/issue/return')) {
                await (await new Controllers(req).update()).bookIssue(req.params.id, { status: 0 });
                await (await new Controllers(req).delete()).bookIssue(req.params.id);
                res.json({ status: true, notification: 'book successfully returned!' });
                return;
            }
        } catch (err) {
            console.log(err);
            res.json({ status: false, notification: 'failed to return book!! ' + err.message });
        }

    },
}