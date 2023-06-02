const express = require('express');
const sessions = require('../../controllers/superadmin/sessions');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { user } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, sessions.index);
router.get('/list', isLoggedIn, sessions.list);
router.get('/create', isLoggedIn, sessions.create);
router.post('/create', isLoggedIn, user().none(), sessions.create);
router.get('/edit/:id', isLoggedIn, sessions.edit);
router.post('/activate/:id', isLoggedIn, sessions.activateSession);
router.post('/edit/:id', isLoggedIn, user().none(), sessions.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;