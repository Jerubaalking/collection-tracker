const express = require('express');
const task = require('../../controllers/superadmin/tasks');
const router = express.Router();

const { isLoggedIn } = require('../../../passport/passport');
const { user } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, task.index);
router.get('/list', isLoggedIn, task.list);
router.get('/create', isLoggedIn, task.create);
router.post('/create', isLoggedIn, user().none(), task.create);
router.get('/edit/:id', isLoggedIn, task.edit);
router.post('/edit/:id', isLoggedIn, user().none(), task.edit);

module.exports = router;