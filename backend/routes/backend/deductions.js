const express = require('express');
const deductions = require('../../controllers/superadmin/deductions');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const upload = require('../../controllers/services/multerConfig');

router.get('/', deductions.index);
router.get('/list', deductions.list);
router.get('/create', deductions.create);
router.post('/create', upload.userImage().none(), deductions.create);
router.get('/edit/:id', deductions.edit);
router.post('/edit/:id', upload.userImage().none(), deductions.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;