const express = require('express');
const pos = require('../../controllers/superadmin/pos');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', pos.index);
router.get('/list', pos.list);
router.get('/sale', pos.sale);
router.get('/create', pos.create);
router.post('/create', userImage().none(), pos.create);
router.get('/edit/:id', pos.edit);
router.post('/edit/:id', userImage().none(), pos.edit);
// router.get('/list/categories/:category', pos.);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;