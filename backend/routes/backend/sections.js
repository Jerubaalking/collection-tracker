const express = require('express');
const section = require('../../controllers/superadmin/sections');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', section.index);
router.get('/list', section.list);
router.get('/create', section.create);
router.post('/create', userImage().none(), section.create);
router.get('/edit/:id', section.edit);
router.get('/list/class/:id', section.classSection);
router.post('/edit/:id', userImage().none(), section.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;