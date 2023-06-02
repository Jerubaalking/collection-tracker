const express = require('express');
const employees = require('../controllers/superadmin/employees');
const router = express.Router();

const { isLoggedIn } = require('../../passport/passport');
const { user } = require('../controllers/services/multerConfig');

router.get('/', isLoggedIn, employees.index);
router.get('/list', isLoggedIn, employees.list);
router.get('/create', isLoggedIn, employees.create);
router.post('/create', isLoggedIn, user().single('employee_image'), employees.create);

router.get('/employers/create/:id', isLoggedIn, employees.employer_create);
router.post('/employers/create/:id', isLoggedIn, user().none(), employees.employer_create);

router.get('/profile/:id', isLoggedIn, employees.profile);
router.get('/edit/:id', isLoggedIn, employees.edit);
router.delete('/:id', isLoggedIn, employees.delete);
router.post('/edit/:id', isLoggedIn, user().single('employee_image'), employees.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;