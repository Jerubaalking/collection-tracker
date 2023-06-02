const express = require('express');
const salaries = require('../../controllers/superadmin/salaries');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage, userCsv } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, salaries.index);
router.get('/profile/:id', salaries.profile);
router.get('/list', isLoggedIn, salaries.list);
router.get('/create', salaries.create);

router.post('/create', userImage().single('image_file'), salaries.create);

router.get('/edit/:id', salaries.edit);
router.get('/permission_overview/:salaries/:user', salaries.permissionOverview);
router.post('/edit/:id', userImage().single('image_image'), salaries.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;