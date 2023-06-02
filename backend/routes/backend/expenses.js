const express = require('express');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

const expenses = require('../../controllers/superadmin/expenses');
router.get('', expenses.index);
router.get('/list', expenses.list);
router.get('/create', expenses.create);
router.post('/create', userImage().none(), expenses.create);
router.get('/edit/:id', expenses.edit);
router.post('/edit/:id', userImage().none(), expenses.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;