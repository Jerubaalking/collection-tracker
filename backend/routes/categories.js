const express = require('express');
const category = require('../controllers/superadmin/categories');
const router = express.Router();

const { isLoggedIn } = require('../../passport/passport');
const { user } = require('../controllers/services/multerConfig');

router.get('/', isLoggedIn, category.index);
router.get('/list', isLoggedIn, category.list);
router.get('/create', isLoggedIn, category.create);
router.post('/create', isLoggedIn, user().none(), category.create);

// router.get('/categories', isLoggedIn, category.categories);
// router.get('/categories/list', isLoggedIn, category.list);
// router.get('/categories/create', isLoggedIn, category.category_create);
// router.post('/categories/create', isLoggedIn, user().none(), category.category_create);

router.get('/profile/:id', isLoggedIn, category.profile);
router.get('/edit/:id', isLoggedIn, category.edit);
router.delete('/:id', isLoggedIn, category.delete);
router.post('/edit/:id', isLoggedIn, user().single('employer_image'), category.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;