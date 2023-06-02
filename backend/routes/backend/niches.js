const express = require('express');
const businesses = require('../../controllers/superadmin/niches');
const router = express.Router();

const { isLoggedIn } = require('../../../passport/passport');
const { businessLogo, businessStamp } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, businesses.index);
router.get('/list', isLoggedIn, businesses.list);
router.get('/create', isLoggedIn, businesses.create);
router.post('/create', isLoggedIn, businessLogo().any(), businesses.create);
router.get('/edit/:id', isLoggedIn, businesses.edit);
// router.post('/activate/:id', isLoggedIn, businesses.activateSession);
router.post('/update/:id', isLoggedIn, businessLogo().any(), businesses.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
router.delete('/delete/:id', isLoggedIn, businesses.delete);
// router.delete('/trash/:id', isLoggedIn, route.settings);
module.exports = router;