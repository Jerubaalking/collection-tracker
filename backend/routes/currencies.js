const express = require('express');
const router = express.Router();
const currencies = require('../controllers/superadmin/currencies');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../../passport/passport');


router.get('/', isLoggedIn, currencies.index);
router.get('/list', isLoggedIn, currencies.list);
router.get('/create', isLoggedIn, currencies.create);
router.get('/:id', isLoggedIn, currencies.edit);
router.post('/create', isLoggedIn,upload.user().none(), currencies.create);
router.post('/:id', isLoggedIn, upload.user().none(), currencies.edit);
// router.delete('/:id', isLoggedIn, currencies);
// router.delete('/trash/:id', isLoggedIn, currencies.);

module.exports = router;