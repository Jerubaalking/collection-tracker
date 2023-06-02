const express = require('express');
const academics = require('../../controllers/superadmin/academics');
const router = express.Router();

const { isLoggedIn } = require('../../../passport/passport');
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', academics.index);
router.post('/list', academics.list);
router.get('/pdf', academics.pdf);
router.get('/url', academics.export);
// router.get('/list/class/:id', academics.classSection);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;