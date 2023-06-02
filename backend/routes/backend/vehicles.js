const express = require('express');
const vehicles = require('../../controllers/superadmin/vehicles');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', vehicles.index);
router.get('/list', vehicles.list);
router.get('/create', vehicles.create);
router.post('/create', userImage().none(), vehicles.create);
router.get('/edit/:id', vehicles.edit);
router.post('/edit/:id', userImage().none(), vehicles.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;