// const { Op } = require("../../../database/mysql");
// // const sections = require("../../../database/models/sections");
// const stockIns = require("../../../database/models/stockIns");
// const { getPayload } = require('./getPayload');
// const { businesses, users, items, item_categories, stockIns} = require("../../../database/models/module_exporter");
// const { generateRandom } = require("../services/service");
// module.exports = {
//     index: async (req, res) => {
//         console.log('req', req.url);
//         let stores = await (await new Controllers(req).find()).stores();
//         res.render('superadmin/stockIns/index', { layout: false, stores: stores });
//     },
//     list: async (req, res) => {
//         let gross = 0;
//         let sold = 0;
//         let soldValue = 0;

//         let stockIns = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).stockIn({ where: { storeId: req.body.storeId }, include: [{ model: items, include: { model: item_categories } }] })));
//         let stockInsItemBatch = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).stockIn({ where: { storeId: req.body.storeId }, [Op.sum]: [{ 'amount': { [Op.as]: 'totalAmout' } }, 'qty'], [Op.groupBy]: ['itemId'] })));
//         console.log('groupBy >>>>>>', stockInsItemBatch);
//         for (const stockIn of stockIns) {
//             stockIn['gross_value'] = 0;
//             if (stockIn.item_batch_number) {
//                 let stockOuts = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).stockOut({ where: { storeId: req.body.storeId, stockInId: stockIn.id } })));
//                 if (!stockOuts.length <= 0) {
//                     for (const stockOut of stockOuts) {
//                         stockIn['available'] -= parseInt(stockOut.qty);

//                         (parseInt(stockOut.qty) != NaN) ? soldValue += parseInt(stockOut.qty) : sold += 0;
//                         (parseInt(stockOut.qty) != NaN) ? soldValue += parseInt(parseInt(stockOut.qty) * stockOut.amount) : soldValue += 0;
//                     }
//                 } else {
//                     stockIn['available'] -= 0.0;
//                 }
//             }

//             (parseInt(stockIn.qty) != NaN) ? stockIn['available'] = parseInt(stockIn.qty) : stockIn['available'] = 0;
//             (parseInt(stockIn.qty) != NaN) ? stockIn['total_value'] = (parseInt(stockIn.qty) * parseInt(stockIn.amount)) : stockIn['total_value'] = 0;
//             (parseInt(stockIn['available']) != NaN) ? gross += parseInt(stockIn['available'] * stockIn.amount) : gross += 0;
//         }


//         // console.log('stockIns_routes::::', await stockIns, gross, sold, soldValue);
//         res.render('superadmin/stockIns/list', { layout: false, stockIns: stockIns, gross: gross, sold: sold, soldValue: soldValue });
//     },
//     create: async (req, res) => {
//         if (req.method == 'GET' && req.url == '/create') {
//             let stores = await (await new Controllers(req).find()).stores();
//             let items = await (await new Controllers(req).findBy()).item({ where: {} });
//             let date = new Date().toISOString().split('T');
//             let batch = date[0].split('-')[0] + date[0].split('-')[1] + date[0].split('-')[2] + date[1].split(':')[0] + date[1].split(':')[1] + (date[1].split(':')[2]).split('.')[0];
//             console.log('batch>>>>>>>>>>', batch, date);
//             res.render('superadmin/stockIns/create', { layout: false, stores: stores, items: items.rows, batch_number: batch });
//         } else {
//             if (req.method == 'POST' && req.url.includes('/create')) {
//                 try {
//                     console.log('its post:');
//                     let data = req.body;
//                     console.log('DATA 1>>>>>::', data, req.body.item_batch_number);
//                     let added = await (await new Controllers(req).create()).stockIn(data);
//                     (added) ?
//                         res.json({ status: true, notification: 'successfully added stock!' }) :

//                         res.json({ status: false, notification: 'failed to add stock!' });
//                 } catch (err) {
//                     res.json({ status: false, notification: 'failed to add stock: ' + err.message })
//                 }
//                 return;
//             }
//         }

//     },
//     edit: async (req, res) => {

//         if (req.method == 'GET' && req.url.includes('/edit')) {
//             let stockIns = await (await new Controllers(req).single()).stockIn(req.params.id);
//             stockIns = JSON.parse(JSON.stringify(stockIns));
//             res.render('superadmin/stockIns/edit', { layout: false, stockIn: stockIns });
//             return;
//         } else {
//             if (req.method == 'POST' && req.url.includes('/edit')) {
//                 try {
//                     let payload = await new Controllers(req);
//                     console.log('its post:');
//                     let data = req.body;
//                     data.sessionId = await (await payload.getCurrentSession()).sessionId;
//                     data.businessId = await (await payload.getCurrentSession()).businessId;
//                     await (await (payload.update())).book(req.params.id, data);
//                     res.json({ status: true, notification: 'successfully updated admin!' })
//                     return;
//                 } catch (err) {
//                     res.json({ status: false, notification: 'failed to update admin: ' + err.message })
//                 }
//             }
//         }
//         return;

//     },

//     /***
//      * BOOKS ISSUE
//      */

//     issueIndex: async (req, res) => {
//         console.log('req', req.url);
//         res.render('superadmin/book_issue/index', { layout: false });
//     },
//     issueList: async (req, res) => {
//         try {
//             if (req.method == 'GET' && req.url.includes('/issue/list')) {
//                 let start = new Date(req.query.start);

//                 let end = new Date(req.query.end);
//                 let bookz = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).bookIssue({ where: { businessId: req.body.businessId, status: 1, sessionId: req.body.sessionId, issue_date: { [Op.between]: [start.toISOString(), end.toISOString()] } }, include: [{ model: stockIns }, { model: students, include: { model: users } }, { model: item_categories }] })));

//                 console.log('stockIns_routes::::', stockIns);
//                 res.render('superadmin/book_issue/list', { layout: false, book_issues: bookz });
//             }
//         } catch (err) {
//             console.log(err);
//             return;
//         }

//     },
//     issueCreate: async (req, res) => {
//         if (req.method == 'GET' && req.url == '/issue/create') {
//             let subjects = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).subject({ where: { businessId: 1 } })));
//             let item_categories = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).class({ where: { businessId: 1 } })));
//             let stockIns = JSON.parse(JSON.stringify(await (await new Controllers(req).findBy()).book({ where: { businessId: 1 } })));
//             res.render('superadmin/book_issue/create', { layout: false, item_categories: item_categories, subjects: subjects, stockIns: stockIns });
//         } else {
//             if (req.method == 'POST' && req.url.includes('/issue/create')) {
//                 console.log('am here bro');
//                 try {
//                     let payload = await getPayload(req);
//                     console.log('its post:');
//                     let data = req.body;
//                     data.issue_date = new Date(data.issue_date).toISOString();
//                     data.sessionId = payload.sessionId;
//                     data.businessId = payload.businessId;
//                     data.status = 1;
//                     var old = await (await new Controllers(req).findBy()).bookIssue({ where: { status: 1, bookId: data.bookId, studentId: data.studentId }, include: [{ model: students, include: { model: users } }] });
//                     old = JSON.parse(JSON.stringify(old));
//                     if (old.length <= 0) {
//                         await creates.bookIssue(data);
//                         res.json({ status: true, notification: 'successfully issued book to student' })
//                     } else {
//                         res.json({ status: false, notification: 'failed to issue book! ' + old[0].student.user.name + ' have not returned a copy of the same book issued on ' + new Date((old[0].createdAt).split('T')[0]).toDateString() + '.' })
//                     }
//                 } catch (err) {
//                     console.log(err);
//                     res.json({ status: false, notification: 'failed to issue book: ' + err.message })
//                 }
//                 return;
//             }
//         }

//     },
//     issueEdit: async (req, res) => {

//         if (req.method == 'GET' && req.url.includes('/issue/edit')) {
//             let issue = await (await new Controllers(req).single()).bookIssue(req.params.id);
//             issue = JSON.parse(JSON.stringify(issue));
//             let control = await new Controllers(req);
//             let ses = await control.getCurrentSession();
//             let item_categories = JSON.parse(JSON.stringify(await (await control.findBy()).class({ where: { businessId: 1 } })));
//             let stockIns = JSON.parse(JSON.stringify(await (await control.findBy()).book({ where: { businessId: 1 } })));
//             console.log();
//             res.render('superadmin/book_issue/edit', { layout: false, item_categories: item_categories, stockIns: stockIns, book_issue: issue });
//             return;
//         } else {
//             if (req.method == 'POST' && req.url.includes('/edit')) {
//                 try {
//                     let payload = await getPayload(req);
//                     console.log('its post:');
//                     let data = req.body;
//                     data.sessionId = payload.sessionId;
//                     data.businessId = payload.businessId;
//                     await (await new Controllers(req).update()).book(req.params.id, data);
//                     res.json({ status: true, notification: 'successfully updated admin!' })
//                     return;
//                 } catch (err) {
//                     res.json({ status: false, notification: 'failed to update admin: ' + err.message })
//                 }
//             }
//         }
//     },
//     issueReturn: async (req, res) => {
//         try {

//             if (req.method == 'DELETE' && req.url.includes('/issue/return')) {
//                 await (await new Controllers(req).update()).bookIssue(req.params.id, { status: 0 });
//                 await (await new Controllers(req).delete()).bookIssue(req.params.id);
//                 res.json({ status: true, notification: 'book successfully returned!' });
//                 return;
//             }
//         } catch (err) {
//             console.log(err);
//             res.json({ status: false, notification: 'failed to return book!! ' + err.message });
//         }

//     },
// }