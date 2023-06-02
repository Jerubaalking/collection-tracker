const express = require('express');
const employers = require('../controllers/superadmin/employers');
const router = express.Router();

const { isLoggedIn } = require('../../passport/passport');
const { user } = require('../controllers/services/multerConfig');

router.get('/', isLoggedIn, employers.index);
router.get('/list', isLoggedIn, employers.list);
router.get('/create', isLoggedIn, employers.create);
router.post('/create', isLoggedIn, user().single('employer_image'), employers.create);


router.get('/profile/:id', isLoggedIn, employers.profile);
router.get('/edit/:id', isLoggedIn, employers.edit);
router.delete('/:id', isLoggedIn, employers.delete);
router.post('/edit/:id', isLoggedIn, user().single('employer_image'), employers.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;