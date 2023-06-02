const express = require('express');
const router = express.Router();
const route = require('../controllers/control');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../controllers/services/handlers');
const { _DB } = require('../../database/schemas');
const { currentUser } = require('../controllers/services/service');

router.get('/', isLoggedIn, route.settings);
router.get('/list', isLoggedIn, route.settings);
router.get('/info', isLoggedIn, route.settings);
router.get('/bargraph/:id', isLoggedIn, async (req, res) => {
    console.log('....::', req.params.id);
    let currentuser = await currentUser(req);
    var Pledges = await new _DB('Pledges', currentuser);
    var Projects = await new _DB('Projects', currentuser);
    var pledge = JSON.parse(JSON.stringify(await Pledges.idFindWithRelative(req.params.id)));
    console.log('pledges....::', pledge);
    var project = JSON.parse(JSON.stringify(await Projects.idFindWithRelative(pledge.projectId)));
    var data = [];
    var all = [];
    var colors = [];
    var labels = [];
    console.log('projects....::', project);
    for (const inc of project.pledges) {
        console.log('....::', inc.id, pledge.id, req.params.id);
        if (inc.id == pledge.id) {
            data.push(inc.amount);
            colors.push("#88c3b9");
            // let co = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"];
            labels.push(`${new Date(inc.date).toLocaleDateString()}`);
        } else {
            data.push(inc.amount);
            all.push(inc.amount);
            labels.push(`${new Date(inc.date).toLocaleDateString()}`);
            colors.push("#e8c3b9");
        }

    }
    console.log('Pledges::::', labels, data, colors, pledge.date);
    // console.log('colors::', colors);
    res.render('pledges/bargraph', { layout: false, labels: labels, data: data, all: all, colors: colors, selectedDate: pledge.date, name: project.name });
});

router.get('/single/:id', isLoggedIn, async (req, res) => {


    let currentuser = await currentUser(req);
    let Pledges = await new _DB('Pledges', currentuser);
    var pledges = JSON.parse(JSON.stringify(await Pledges.idFindWithRelative(req.params.id)));
    console.log('Pledges income::', pledges);
    res.render('pledges/reportSingle', { layout: false, title: 'Pledge', pledges: pledges, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});
router.get('/multiple', isLoggedIn, async (req, res) => {
    let currentuser = await currentUser(req);
    let Pledges = await new _DB('Pledges', currentuser);
    var transaction = JSON.parse(JSON.stringify(await Pledges.findWithRelatives()));
    console.log('server data::: 1', transaction);
    res.render('pledges/reportMultiple', { layout: false, title: 'Pledges', pledges: transaction, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});
router.get('/report/:id', isLoggedIn, route.settings);

router.get('/reports/', isLoggedIn, route.settings);
router.get('/create', isLoggedIn, route.settings);
router.get('/:id', isLoggedIn, route.settings);
router.post('/', isLoggedIn, upload.single('avatar'), route.settings);
router.post('/:id', isLoggedIn, route.settings);
router.delete('/:id', isLoggedIn, route.settings);
router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;