const express = require('express');
const router = express.Router();
const route = require('../controllers/control');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../controllers/services/handlers');
const { _DB } = require('../../database/schemas');
const { currentUser } = require('../controllers/services/service');

router.get('/', isLoggedIn, route.settings);
router.get('/list', isLoggedIn, route.settings);
router.get('/bargraph/:id', isLoggedIn, async (req, res) => {
    let Services = await new _DB('Services');
    let services = await Services.idFind(req.params.id);
    res.render('services/bargraph', { layout: false, service: JSON.parse(JSON.stringify(services)) });
});
router.get('/bydate', isLoggedIn, async (req, res) => {
    let start = req.query.start;
    let end = req.query.end;
    let Services = await new _DB('Services');
    let services = JSON.parse(JSON.stringify(await Services.idFindYByDate(req.params.id, start, end)));
    // console.log('serviceeesss:::', services);
    res.render('services/list', { layout: false, services: services });
});
router.get('/single/:id', isLoggedIn, async (req, res) => {
    let currentuser = await currentUser(req);
    let Services = await new _DB('Services', currentuser);
    /**
     * create the project!
     */
    var services = JSON.parse(JSON.stringify(await Services.idFindWithRelative(req.params.id)));
    // console.log('server data:::', req.params.id, projects);
    /**
     * create an object that can temporary store values that i need to refer to.
     */


    // console.log('server data::: 1', projects);
    //http://localhost:5000/projects/report/1
    res.render('services/reportSingle', { layout: false, title: 'Service', services: services, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});
router.get('/multiple', isLoggedIn, async (req, res) => {
    let currentuser = await currentUser(req);
    let Services = await new _DB('Services', currentuser, 20, req.query);
    /**
     * create the project!
     */
    var services = JSON.parse(JSON.stringify(await Services.findWithRelatives()));
    // console.log('server data:::', req.params.id, projects);
    /**
     * create an object that can temporary store values that i need to refer to.
     */

    // res.json(services);
    //http://localhost:5000/projects/report/1
    res.render('services/reportMultiple', { layout: false, title: 'Services', services: services, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});
// router.get('/multiple/reports', isLoggedIn, async (req, res) => {
//     let currentuser = await currentUser(req);
//     res.render('services/reportMultiple', { layout: false, title: 'Services', datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
// });
router.get('/report/:id', isLoggedIn, route.settings);
router.get('/reports', isLoggedIn, route.settings);
router.get('/create', isLoggedIn, route.settings);
router.get('/:id', isLoggedIn, route.settings);
router.post('/', isLoggedIn, upload.none(), route.settings);
router.post('/:id', isLoggedIn, upload.none(), route.settings);
router.delete('/:id', isLoggedIn, route.settings);
router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;