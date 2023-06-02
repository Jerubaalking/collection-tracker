const express = require('express');
const accountant = require('../../controllers/superadmin/accountants');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
const { userImage, userCsv } = require('../../controllers/services/multerConfig');

router.get('/', accountant.index);
router.get('/profile/:id', accountant.profile);
router.get('/list', accountant.list);
router.get('/create', accountant.create);

router.post('/create', userImage().none(), accountant.create);

router.get('/edit/:id', accountant.edit);
router.post('/edit/:id', userImage().none(), accountant.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;