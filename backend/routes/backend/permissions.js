const express = require('express');
const permission = require('../../controllers/superadmin/permissions');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', permission.index);
router.get('/list', permission.list);
router.get('/filter/:class/:section', permission.teachersList);
router.post('/create', userImage().none(), permission.create);
router.post('/modify_permission', userImage().none(), permission.modify);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;