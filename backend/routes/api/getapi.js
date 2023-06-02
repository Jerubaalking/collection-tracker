const express = require('express');
const { _DB } = require('../../../database/schemas');
const router = express.Router();
// const route = require('../controllers/control');
// const upload = require('../controllers/services/multerConfig');

router.get('/regions/:id', async (req, res) => {
    let countries = await new _DB('Countries');
    let country = JSON.parse(JSON.stringify(await countries.idFindWithRelative(req.params.id)));
    console.log("api::", country);
    res.json(country.regions);
});

router.get('/subscription/:id', async (req, res) => {
    let Subscriptions = await new _DB('Subscriptions');
    let subscriptions = JSON.parse(JSON.stringify(await Subscriptions.idFindWithRelative(req.params.id)));
    let Prices = await new _DB('SubscriptionsPrices');
    console.log("api::", subscriptions);
    subscriptions.subscription_prices = JSON.parse(JSON.stringify(await Prices.subscriptionsPriceSetter(subscriptions.id)));
    res.json(subscriptions);
});

module.exports = router;