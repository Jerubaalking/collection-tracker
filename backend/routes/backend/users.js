const express = require('express');
const admin = require('../../controllers/superadmin/users');
const router = express.Router();

const { isLoggedIn } = require('../../../passport/passport');
const { user } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, admin.index);
router.get('/list', isLoggedIn, admin.list);
router.get('/create', isLoggedIn, admin.create);
router.post('/create', isLoggedIn, user().single('user_image'), admin.create);
router.get('/upload/:id', isLoggedIn, admin.upload);
router.post('/upload/:id', isLoggedIn, user().single('user_image'), admin.upload);
router.get('/address/:id', isLoggedIn, admin.address);
router.post('/address/:id', isLoggedIn, user().single('user_image'), admin.address);
router.get('/password/:id', isLoggedIn, admin.password);
router.post('/password/:id', isLoggedIn, user().single('user_image'), admin.verify_password);
router.post('/password/role/:id', isLoggedIn, user().single('user_image'), admin.verify_password);
router.get('/edit/:id', isLoggedIn, admin.edit);
// router.post('/activate/:id', isLoggedIn, admin.activateSession);
router.post('/edit/:id', isLoggedIn, user().single('user_image'), admin.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;