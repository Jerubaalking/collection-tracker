const express = require('express');
const router = express.Router();
const route = require('../controllers/control');
const upload = require('../controllers/services/multerConfig');
const { isLoggedIn } = require('../controllers/services/handlers');
const { _DB } = require('../../database/schemas');
const { currentUser } = require('../controllers/services/service');

router.get('/', isLoggedIn, route.settings);
router.get('/list', isLoggedIn, route.settings);
router.get('/reports', isLoggedIn, route.settings);
router.get('/csv/reports', isLoggedIn, route.settings);
router.get('/report/:id', isLoggedIn, route.settings);
router.get('/info', isLoggedIn, route.settings);
router.get('/bargraph/:id', isLoggedIn, async (req, res) => {
    console.log('....::', req.params.id);
    let currentuser = await currentUser(req);
    var Incomes = await new _DB('Incomes', currentuser);
    var income = JSON.parse(JSON.stringify(await Incomes.idFindWithRelative(req.params.id)));
    var incomes = JSON.parse(JSON.stringify(await Incomes.findWithRelatives({ where: { date: income.date } })));
    var data = [];
    var all = [];
    var colors = [];
    var labels = [];
    for (const inc of incomes) {
        console.log('....::', inc);
        if (inc.id == income.id) {
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
    // console.log('colors::', colors);
    res.render('incomes/graph', { layout: false, labels: labels, data: data, all: all, colors: colors, selectedDate: income.date });
});

router.get('/single/:id', isLoggedIn, async (req, res) => {


    let currentuser = await currentUser(req);
    let Incomes = await new _DB('Incomes', currentuser);
    var transaction = JSON.parse(JSON.stringify(await Incomes.idFindWithRelative(req.params.id)));
    console.log('Transactions income::', transaction);
    res.render('incomes/reportSingle', { layout: false, title: 'Income', incomes: transaction, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});
router.get('/multiple', isLoggedIn, async (req, res) => {
    let currentuser = await currentUser(req);
    let Incomes = await new _DB('Incomes', currentuser);
    var transaction = JSON.parse(JSON.stringify(await Incomes.findWithRelatives()));
    res.render('incomes/reportMultiple', { layout: false, title: 'Incomes', incomes: transaction, datetime: new Date().toDateString(), time: new Date().toTimeString(), currentuser: currentuser });
});

router.get('/pdfheader', isLoggedIn, async (req, res) => {
    res.render('partials/defaultPDFHeader', { layout: false });
});

router.get('/create', isLoggedIn, route.settings);
router.get('/:id', isLoggedIn, route.settings);
router.post('/', isLoggedIn, upload.single('logo'), route.settings);
router.post('/:id', isLoggedIn, route.settings);
router.delete('/:id', isLoggedIn, route.settings);
router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;