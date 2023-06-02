const express = require('express');
const menus = require('../../controllers/superadmin/menus');
const router = express.Router();

const { isLoggedIn } = require('../../../passport/passport');
const { user } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, menus.index);
router.get('/list', isLoggedIn, menus.list);
router.get('/create', isLoggedIn, menus.create);
router.post('/create', isLoggedIn, user().none(), menus.create);
router.post('/visibility', isLoggedIn, user().none(), menus.visibility);
router.get('/edit/:id', isLoggedIn, menus.edit);
router.post('/edit/:id', isLoggedIn, user().none(), menus.edit);
// router.get('/list', isLoggedIn, route.settings); 
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
router.delete('/delete/:id', isLoggedIn, menus.delete);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;