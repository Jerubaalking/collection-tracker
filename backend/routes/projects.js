const express = require('express');
const router = express.Router();
const route = require('../controllers/control');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../controllers/services/handlers');
const { _DB } = require('../../database/schemas');
const { currentUser } = require('../controllers/services/service');
const BaseUrl = require('../../base');
const { makePDF } = require('../controllers/services/pdfHandle');

router.get('/', isLoggedIn, route.settings);
router.get('/list', isLoggedIn, route.settings);
router.get('/bargraph/:id', isLoggedIn, async (req, res) => {

    let Projects = await new _DB('Projects');
    var Transactions = await new _DB('Transactions');
    let projects = JSON.parse(JSON.stringify(await Projects.idFindWithRelative(req.params.id)));
    var data = { contribution: 0, pledges: 0 };
    for (var i = 0; i < projects.pledges.length; i++) {
        data.pledges = parseFloat(data.pledges) + parseFloat(projects.pledges[i].amount);
    }
    for (var x = 0; x < projects.contributions.length; x++) {
        var transaction = JSON.parse(JSON.stringify(await Transactions.idFindWithRelative(projects.contributions[x].transactionId)));
        data.contribution = parseFloat(data.contribution) + parseFloat(transaction.amount);
        console.log('server data:::', x);
    }

    console.log('server data:::', data);
    res.render('projects/bargraph', { layout: false, pledges: data.pledges, contributions: data.contribution });
});
router.get('/single/:id', isLoggedIn, async (req, res) => {
    let currentuser = await currentUser(req);
    let Projects = await new _DB('Projects');
    var Transactions = await new _DB('Transactions');
    /**
     * create the project!
     */
    var projects = JSON.parse(JSON.stringify(await Projects.idFindWithRelative(req.params.id)));
    // console.log('server data:::', req.params.id, projects);
    /**
     * create an object that can temporary store values that i need to refer to.
     */
    var data = { contribution: 0, pledges: 0 };
    for (var i = 0; i < projects.pledges.length; i++) {
        projects['pledged_amount'] = parseFloat(data.pledges) + parseFloat(projects.pledges[i].amount);
    }
    for (var x = 0; x < projects.contributions.length; x++) {
        var transaction = JSON.parse(JSON.stringify(await Transactions.idFindWithRelative(projects.contributions[x].transactionId)));
        projects['contribution_amount'] = parseFloat(data.contribution) + parseFloat(transaction.amount);
    }

    // console.log('server data::: 1', projects);
    //http://localhost:5000/projects/report/1
    res.render('projects/reportSingle', { layout: false, title: 'Project', projects: projects, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});
router.get('/multiple', isLoggedIn, async (req, res) => {
    let currentuser = await currentUser(req);
    let Projects = await new _DB('Projects', currentuser);
    var Transactions = await new _DB('Transactions');
    var projects = JSON.parse(JSON.stringify(await Projects.findWithRelatives()));
    // console.log('server data:::', req.params.id, projects);
    var data = { contribution: 0, pledges: 0 };
    for (var i = 0; i < projects.length; i++) {
        for (var x = 0; x < projects[i].pledges.length; x++) {
            projects[i]['pledged_amount'] = parseFloat(data.pledges) + parseFloat(projects[i].pledges[x].amount);
        }
        for (var x = 0; x < projects[i].contributions.length; x++) {
            var transaction = JSON.parse(JSON.stringify(await Transactions.idFindWithRelative(projects[i].contributions[x].transactionId)));
            projects[i]['contribution_amount'] = parseFloat(data.contribution) + parseFloat(transaction.amount);
        }
    }



    console.log('server data::: 1', projects);
    res.render('projects/reportMultiple', { layout: false, title: 'Projects', projects: projects, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});
router.get('/report/:id', isLoggedIn, route.settings);
/**
 * Query by date
 */
router.get('/bydate', isLoggedIn, async (req, res) => {
    let start = req.query.start;
    let end = req.query.end;
    let Projects = await new _DB('Projects');
    let projects = JSON.parse(JSON.stringify(await Projects.idFindYByDate(req.params.id, start, end)));
    // console.log('serviceeesss:::', projects);
    res.render('projects/list', { layout: false, projects: projects });
});

router.get('/reports/', isLoggedIn, route.settings);
router.get('/create', isLoggedIn, route.settings);
router.get('/:id', isLoggedIn, route.settings);
router.post('/', isLoggedIn, upload.single('avatar'), route.settings);
router.post('/:id', isLoggedIn,upload.none(), route.settings);
router.delete('/:id', isLoggedIn, route.settings);
router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;