const express = require('express');
const marks = require('../../controllers/superadmin/marks');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', marks.index);
router.post('/list', marks.list);
router.get('/create', marks.create);
router.get('/sections/:id', marks.sections);
router.post('/sections/:id', marks.sections);
router.post('/create', userImage().none(), marks.create);
router.get('/edit/:id', marks.edit);
router.get('/list/class/:id', marks.classSection);
router.post('/edit', userImage().none(), marks.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;