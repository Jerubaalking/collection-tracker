const express = require('express');
const dealers = require('../../controllers/superadmin/software_dealers');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { user } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, dealers.index);
router.get('/list', isLoggedIn, dealers.list);
router.get('/create', isLoggedIn, dealers.create);
router.post('/create', isLoggedIn, user().none(), dealers.create);
router.get('/edit/:id', isLoggedIn, dealers.edit);
router.post('/activate/:id', isLoggedIn, dealers.activateSession);
router.post('/edit/:id', isLoggedIn, user().none(), dealers.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;