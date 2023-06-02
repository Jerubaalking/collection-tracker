const express = require('express');
const { isLoggedIn } = require('../../passport/passport');

const i18n = require('../helpers/languages/i18n.config');
const models = require('../../database/models/module_exporter');
const router = express.Router();
router.get('/language/list', async (req, res) => {
    let lang = JSON.parse(JSON.stringify(await models.languages.findAll()));
    // req.session.passport['language'] = lang[0];
    console.log(lang);
    res.render('superadmin/language/dropdown', { layout: false, languages: lang, current: i18n.getLocale() })
});
router.get('/language/auth/list', async (req, res) => {
    let lang = JSON.parse(JSON.stringify(await models.languages.findAll()));
    console.log(lang);
    // i18n.setLocale(req.cookies.locale);
    // req.session.passport['language'] = lang[0];
    // console.log(req.session);
    res.render('superadmin/language/authDropdown', { layout: false, languages: lang, current: i18n.getLocale() })
});
router.get('/language/change/:key', async (req, res) => {

    console.log(req.params);
    i18n.setLocale(req.params.key);
    res.cookie('locale', i18n.getLocale());
    res.status(200).json({ status: true, notification: 'language changed!' });
});

router.get('/:theme', isLoggedIn, async (req, res) => {
    console.log(req.params);
    req.session.passport.user['theme'] = req.params.theme;
    res.cookie('theme', req.params.theme);
    res.status(200).json({ status: true, notification: 'theme changed' });
});

module.exports = router;