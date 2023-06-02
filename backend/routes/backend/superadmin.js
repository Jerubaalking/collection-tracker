const express = require('express');
const superadmin = require('../../controllers/superadmin/superadmin');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { user } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, superadmin.index);
router.get('/list', isLoggedIn, superadmin.list);
router.get('/create', isLoggedIn, superadmin.create);
router.post('/create', isLoggedIn, user().none(), superadmin.create);
router.get('/edit/:id', isLoggedIn, superadmin.edit);
router.post('/activate/:id', isLoggedIn, superadmin.activateSession);
router.post('/edit/:id', isLoggedIn, user().none(), superadmin.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;