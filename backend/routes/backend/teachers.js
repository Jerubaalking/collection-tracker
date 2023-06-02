const express = require('express');
const teacher = require('../../controllers/superadmin/teacher');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage, userCsv } = require('../../controllers/services/multerConfig');

router.get('/', teacher.index);
router.get('/profile/:id', teacher.profile);
router.get('/list', teacher.list);
router.get('/create', teacher.create);

router.post('/create', userImage().single('image_file'), teacher.create);

router.get('/edit/:id', teacher.edit);
router.get('/permission_overview/:teacher/:user', teacher.permissionOverview);
router.post('/edit/:id', userImage().single('image_image'), teacher.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;