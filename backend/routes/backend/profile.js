const express = require('express');
const profile = require('../../controllers/superadmin/profile');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage, userCsv } = require('../../controllers/services/multerConfig');

router.get('/', profile.index);
router.get('/profile/:id', profile.profile);
router.get('/list', profile.list);
router.get('/create', profile.create);

router.post('/create', userImage().single('image_file'), profile.create);

router.get('/edit/:id', profile.edit);
// router.get('/permission_overview/:profile/:user', profile.permissionOverview);
router.post('/edit/:id', userImage().single('image_image'), profile.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;