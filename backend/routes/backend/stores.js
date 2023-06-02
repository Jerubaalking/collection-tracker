const express = require('express');
const stores = require('../../controllers/superadmin/stores');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { user } = require('../../controllers/services/multerConfig');

router.get('/', stores.index);
router.get('/list', stores.list);
router.get('/create', stores.create);
// router.get('/sections/:id', stores.sections);
// router.post('/sections/:id', userImage().none(), stores.sections);
router.post('/create', user().none(), stores.create);
router.get('/edit/:id', stores.edit);
// router.get('/list/class/:id', stores.classSection);
router.post('/edit/:id', user().none(), stores.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;