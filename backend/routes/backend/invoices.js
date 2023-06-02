const express = require('express');
const invoice = require('../../controllers/superadmin/invoices');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage, userCsv } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, invoice.index);
router.get('/available/:stockId/:store', isLoggedIn, invoice.available);
router.get('/stocks/:stockId/:store', isLoggedIn, invoice.availableStock);
router.get('/category/:category/:store/:index', isLoggedIn, invoice.categoryItems);
router.get('/list', isLoggedIn, invoice.list);
router.get('/items/:id', isLoggedIn, invoice.items);
router.get('/add/items/:id', isLoggedIn, invoice.add_items);
router.post('/items/create/:id', isLoggedIn, userImage().none(), invoice.save_items);
router.delete('/items/remove/:id', isLoggedIn, invoice.remove_item);

router.get('/mass', isLoggedIn, invoice.mass);
router.get('/single', isLoggedIn, invoice.single);
router.post('/mass', isLoggedIn, userImage().none(), invoice.mass);
router.post('/single', isLoggedIn, userImage().none(), invoice.single);
router.get('/report/pdf', isLoggedIn, invoice.pdf);
router.get('/report/csv', isLoggedIn, invoice.csv);
router.get('/export', isLoggedIn, invoice.export);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;