const express = require('express');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
// const upload = require('../controllers/services/multerConfig');
const superadmin = require('../controllers/superadmin');

router.get('/', superadmin.index);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLoggedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;