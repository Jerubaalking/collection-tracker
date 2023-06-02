const express = require('express');
const items = require('../../controllers/superadmin/items');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
const { user } = require('../../controllers/services/multerConfig');
const { isLoggedIn } = require('../../../passport/passport');

router.get('/', isLoggedIn, items.index);
router.get('/list/:category', isLoggedIn, items.list);
router.get('/create', isLoggedIn, items.create);
router.post('/create', isLoggedIn, user().none(), items.create);
router.get('/edit/:id', isLoggedIn, items.edit);
router.post('/edit/:id', isLoggedIn, user().none(), items.edit);
router.get('/list/categories/:category', isLoggedIn, items.item_categoriesStores);
router.delete('/delete/:id', isLoggedIn, items.delete);

module.exports = router;