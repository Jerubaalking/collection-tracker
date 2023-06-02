const express = require('express');
const classrooms = require('../../controllers/superadmin/classrooms');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', classrooms.index);
router.get('/list', classrooms.list);
router.get('/create', classrooms.create);
router.get('/sections/:id', classrooms.sections);
router.post('/sections/:id', classrooms.sections);
router.post('/create', userImage().none(), classrooms.create);
router.get('/edit/:id', classrooms.edit);
router.get('/list/class/:id', classrooms.classSection);
router.post('/edit/:id', userImage().none(), classrooms.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;