const express = require('express');
const router = express.Router();
const route = require('../controllers/control');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../controllers/services/handlers');

router.get('/', isLoggedIn, route.settings);
router.get('/list', isLoggedIn, route.settings);
router.get('/create', isLoggedIn, route.settings);
router.get('/:id', isLoggedIn, route.settings);
router.post('/',isLoggedIn,upload.single('logo'),route.settings);
router.post('/:id',isLoggedIn, route.settings);
router.delete('/:id', isLoggedIn, route.settings);
router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;