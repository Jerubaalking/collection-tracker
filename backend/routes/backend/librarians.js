const express = require('express');
const librarian = require('../../controllers/superadmin/librarians');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage, userCsv } = require('../../controllers/services/multerConfig');

router.get('/', librarian.index);
router.get('/profile/:id', librarian.profile);
router.get('/list', librarian.list);
router.get('/create', librarian.create);

router.post('/create', userImage().none(), librarian.create);

router.get('/edit/:id', librarian.edit);
router.post('/edit/:id', userImage().none(), librarian.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;