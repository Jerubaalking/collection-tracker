const express = require('express');
const grades = require('../../controllers/superadmin/grades');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', grades.index);
router.get('/list', grades.list);
router.get('/create', grades.create);
router.post('/create', userImage().none(), grades.create);
router.get('/edit/:id', grades.edit);
router.post('/edit/:id', userImage().none(), grades.edit);
router.get('/of/:grade', grades.gradeOf);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;