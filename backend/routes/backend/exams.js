const express = require('express');
const exams = require('../../controllers/superadmin/exams');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', exams.index);
router.get('/list', exams.list);
router.get('/create', exams.create);
router.post('/create', userImage().none(), exams.create);
router.get('/edit/:id', exams.edit);
router.post('/edit/:id', userImage().none(), exams.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;