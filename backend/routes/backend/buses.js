const express = require('express');
const buses = require('../../controllers/superadmin/buses');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/routes', buses.index);
router.get('/routes/list', isLoggedIn, buses.list);
router.get('/routes/create', isLoggedIn, buses.create);
router.post('/routes/create', isLoggedIn, userImage().none(), buses.create);
router.get('/routes/edit/:id', isLoggedIn, buses.edit);
router.post('/routes/edit/:id', isLoggedIn, userImage().none(), buses.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;