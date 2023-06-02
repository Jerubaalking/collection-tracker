const express = require('express');
const schedule = require('../../controllers/superadmin/schedules');
const router = express.Router();

const { isLoggedIn } = require('../../../passport/passport');
const { user } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, schedule.index);
router.get('/list', isLoggedIn, schedule.list);
router.get('/create', isLoggedIn, schedule.create);
router.post('/create', isLoggedIn, user().none(), schedule.create);
router.get('/edit/:id', isLoggedIn, schedule.edit);
router.post('/edit/:id', isLoggedIn, user().none(), schedule.edit);

module.exports = router;