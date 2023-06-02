const express = require('express');
const customer = require('../../controllers/superadmin/customers');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
const { user, userCsv } = require('../../controllers/services/multerConfig');

router.get('/', customer.index);
router.get('/profile/:id', customer.profile);
router.get('/list/:store', customer.list);
router.get('/create', customer.create);
router.get('/invoice/create/:id', customer.add_invoice);
router.post('/invoice/create/:id', user().none(), customer.save_invoice);
router.get('/create/bulk', customer.bulk);
router.get('/create/single', customer.single);
router.get('/create/excel', customer.excel);
// router.get('/class/:class', customer.classWise);

router.post('/create/bulk', user().single('customer_image'), customer.bulk);
router.post('/create/single', user().single('customer_image'), customer.single);
router.post('/create/excel', userCsv().single('csv_file'), customer.excel);

router.get('/edit/:id', customer.edit);
// router.get('/filter/store/:store', customer.classSection);
router.post('/edit/:id', user().single('customer_image'), customer.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;