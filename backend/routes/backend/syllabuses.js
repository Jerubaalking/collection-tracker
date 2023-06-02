const express = require('express');
const syllabuses = require('../../controllers/superadmin/syllabuses');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
const { syllabus } = require('../../controllers/services/multerConfig');

router.get('/', syllabuses.index);
router.get('/list/:class/:section', syllabuses.list);
router.get('/create', syllabuses.create);
router.post('/create', syllabus().single('syllabus_file'), syllabuses.create);
router.get('/edit/:id', syllabuses.edit);
router.post('/edit/:id', syllabus().none(), syllabuses.edit);
router.delete('/delete/:id', syllabuses.delete);
router.get('/list/class/:class', syllabuses.classSubjects);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;