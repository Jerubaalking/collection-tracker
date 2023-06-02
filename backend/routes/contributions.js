const express = require('express');
const router = express.Router();
const route = require('../controllers/control');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../controllers/services/handlers');
const { _DB } = require('../../database/schemas');

router.get('/', isLoggedIn, route.settings);
router.get('/list', isLoggedIn, route.settings);
// router.get('/projects/bargraph/:id', isLoggedIn, async (req, res) => {

//     let Members = await new _DB('Members');
//     let members = await Members.idFind(req.params.id);
//     res.render('members/bargraph', { layout: false, service: JSON.parse(JSON.stringify(members)) });
// });
router.get('/create', isLoggedIn, route.settings);
router.get('/:id', isLoggedIn, route.settings);
router.post('/', isLoggedIn, upload.single('avatar'), route.settings);
router.post('/:id', isLoggedIn, route.settings);
router.delete('/:id', isLoggedIn, route.settings);
router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;