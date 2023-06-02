
const { engine } = require("express-handlebars");
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
// const session = require('express-session');
// const SessionStore = require('session-file-store')(session);
const passport = require('passport');
const flash = require('express-flash');
const { passportInit, authenticateUser } = require('./passport/passport');
const LocalStrategy = require('passport-local').Strategy;
const app = require('./applications/app');

dotenv.config({ path: './config/config.env' });
const cors = require('cors');

const models = require("./database/models/module_exporter");
app.use(cors({
    origin: ['https://www.saincrafttechnologies.com', 'http://collection-logger.builds.saincrafttechnologies.com', 'https://saincrafttechnologies-static-public-2023.fra1.digitaloceanspaces.com/storekeeperapp/public', process.env.D_PUBLIC],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'HEAD']
}));
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    authenticateUser));

passport.serializeUser(function (user, done) {
    return done(null, user);
});
passport.deserializeUser(function (user, done) {
    // console.log('am deserializing', user.id);
    try {
        return models.contacts.findOne({ where: { email: user.email }, include: [{ model: models.users, include: [{ model: models.roles }, { model: models.languages }, { model: models.uploads }] }, { model: models.authentications }] }).then(contact => {
            let _contact = JSON.parse(JSON.stringify(contact));
            let _user = _contact.users[0];
            let userData = {
                id: _user.id,
                name: _user.name,
                email: _user.email,
                role: _user.roles[0],
                userId: _user.id,
                language: _user.languages[0],
                avatar: (_user.upload) ? _user.upload.path : null,
            }
            http.globalAgent = { language: _user.languages[0] };
            return done(null, userData);
        });
    } catch (err) {
        return done(err)
    }
});
app.use(passport.initialize());
app.use(passport.session())
// console.log(path.resolve(__dirname + '/config/config.env'));
app.use(flash());
app.use('/public', express.static(path.resolve(__dirname + process.env.D_PUBLIC)));
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine('hbs', engine({
    defaultLayout: 'layout',
    layoutsDir: 'views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: require('./backend/helpers/handle_bar').helpers,
    registerPartial: "home",
    extname: '.hbs',
    registerPartial: 'settings'
}));

require('./routeManager')(app);
const Query = require('./database/queries');
app.use('/auth', require('./backend/routes/auth'));
// require('./passport/passport')(passport);
const executiveQueries = require('./database/executiveQueries');
// routeManager(app);

const port = process.env.PORT || 3001;
const _env = process.env.NODE_ENV;

http.createServer(app)
    .listen(port, async () => {
        let Q = new Query();
        await Q.syncTable();
        // await executiveQueries();
        console.log(`server running in ${_env} mode on port ${port}`);
    });
