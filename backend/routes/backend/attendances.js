const express = require('express');
const attendances = require('../../controllers/superadmin/attendances');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', attendances.index);
router.post('/filter', attendances.filter);
// router.get('/create', attendances.create);
// // router.post('/create', userImage().none(), attendances.create);
// router.get('/edit/:id', attendances.edit);
// router.post('/edit/:id', userImage().none(), attendances.edit);
router.get('/take_attendance', attendances.take_attendace);
router.post('/take_attendance', userImage().none(), attendances.take_attendace);
router.post('/students', attendances.student);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;