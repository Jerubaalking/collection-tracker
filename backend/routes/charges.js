const express = require('express');
const charges = require('../controllers/superadmin/charges');
const router = express.Router();

const { isLoggedIn } = require('../../passport/passport');
const { user } = require('../controllers/services/multerConfig');

router.get('/', isLoggedIn, charges.index);
router.get('/list', isLoggedIn, charges.list);
router.get('/create', isLoggedIn, charges.create);
router.post('/create', isLoggedIn, user().single('employer_image'), charges.create);

router.get('/categories', isLoggedIn, charges.categories);
router.get('/categories/list', isLoggedIn, charges.categories_list);
router.get('/categories/create/:id', isLoggedIn, charges.category_create);
router.post('/categories/create/:id', isLoggedIn, user().none(), charges.category_create);

router.get('/profile/:id', isLoggedIn, charges.profile);
router.get('/edit/:id', isLoggedIn, charges.edit);
router.delete('/:id', isLoggedIn, charges.delete);
router.post('/edit/:id', isLoggedIn, user().single('employer_image'), charges.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;