const express = require('express');
const products = require('../../controllers/superadmin/products');
const router = express.Router();

const { isLoggedIn } = require('../../../passport/passport');
const { businessLogo, businessStamp } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, products.index);
router.get('/list', isLoggedIn, products.list);
router.get('/create', isLoggedIn, products.create);
router.post('/create', isLoggedIn, businessLogo().any(), products.create);
router.get('/edit/:id', isLoggedIn, products.edit);
// router.post('/activate/:id', isLoggedIn, products.activateSession);
router.post('/update/:id', isLoggedIn, businessLogo().any(), products.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
router.delete('/delete/:id', isLoggedIn, products.delete);
// router.delete('/trash/:id', isLoggedIn, route.settings);
module.exports = router;