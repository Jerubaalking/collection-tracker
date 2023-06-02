const express = require('express');
const router = express.Router();
const countries = require('../controllers/superadmin/countries');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../../passport/passport');


router.get('/', isLoggedIn, countries.index);
router.get('/list', isLoggedIn, countries.list);
router.get('/create', isLoggedIn, countries.create);
router.get('/edit/:id', isLoggedIn, countries.edit);
router.get('/update/currency/:id/:currencyId', isLoggedIn, countries.activateCurrency);
router.post('/create', isLoggedIn, upload.user().none(), countries.create);
router.post('/:id', isLoggedIn, upload.user().none(), countries.edit);
// router.delete('/:id', isLoggedIn, countries);
// router.delete('/trash/:id', isLoggedIn, countries.);

module.exports = router;