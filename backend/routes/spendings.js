const express = require('express');
const router = express.Router();
const route = require('../controllers/control');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../controllers/services/handlers');
const { _DB } = require('../../database/schemas');
const { currentUser } = require('../controllers/services/service');

router.get('/', isLoggedIn, route.settings);
router.get('/list', isLoggedIn, route.settings);
router.get('/create', isLoggedIn, route.settings);
router.get('/report/:id', isLoggedIn, route.settings);
router.get('/reports', isLoggedIn, route.settings);

router.get('/bargraph/:id', isLoggedIn, async (req, res) => {
    console.log('....::', req.params.id);
    let currentuser = await currentUser(req);
    var Spendings = await new _DB('Spendings', currentuser);
    var spending = JSON.parse(JSON.stringify(await Spendings.idFindWithRelative(req.params.id)));
    var spendings = JSON.parse(JSON.stringify(await Spendings.findWithRelatives({ where: { date: spending.date } })));
    var data = [];
    var all = [];
    var colors = [];
    var labels = [];
    for (const inc of spendings) {
        console.log('....::', inc);
        if (inc.id == spending.id) {
            data.push(inc.amount);
            all.push(inc.amount);
            colors.push("#88c3b9");
            // let co = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"];
            labels.push(`${new Date(inc.date).toLocaleDateString()} ${inc.receipt}`);
        } else {
            data.push(inc.amount);
            all.push(inc.amount);
            labels.push(`${new Date(inc.date).toLocaleDateString()} ${inc.receipt}`);
            colors.push("#e8c3b9");
        }

    }
    console.log('colors::', colors);
    res.render('spendings/graph', { layout: false, labels: labels, data: data, all: all, colors: colors, selectedDate: spending.date });
});

router.get('/single/:id', isLoggedIn, async (req, res) => {


    let currentuser = await currentUser(req);
    let Spendings = await new _DB('Spendings', currentuser);
    var transaction = JSON.parse(JSON.stringify(await Spendings.idFindWithRelative(req.params.id)));
    console.log('Transactions spending::', transaction);
    res.render('spendings/reportSingle', { layout: false, title: 'Spendings', spendings: transaction, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});
router.get('/multiple', isLoggedIn, async (req, res) => {
    let currentuser = await currentUser(req);
    let Spendings = await new _DB('Spendings', currentuser);
    var transaction = JSON.parse(JSON.stringify(await Spendings.findWithRelatives()));
    res.render('spendings/reportMultiple', { layout: false, title: 'Spendings', spendings: transaction, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});

router.get('/:id', isLoggedIn, route.settings);
router.post('/', isLoggedIn, upload.single('logo'), route.settings);
router.post('/:id', isLoggedIn, route.settings);
router.delete('/:id', isLoggedIn, route.settings);
router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;