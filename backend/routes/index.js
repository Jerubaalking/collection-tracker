const express = require('express');
const BaseUrl = require('../../base');
const { _DB } = require('../../database/schemas');
const router = express.Router();
const route = require('../controllers/control');
const { isLoggedIn, spawnJwtPayload, refresh } = require('../controllers/services/handlers');
const upload = require('../controllers/services/multerConfig');
const requestHandler = require('../controllers/services/requestHandler');
const { currentUser } = require('../controllers/services/service');

router.get('/', isLoggedIn, async (req, res) => {
    let currentuser = await currentUser(req);
    console.log("currentUser::", currentuser);
    res.render('home', { layout: 'manager', profile: currentuser });
});
// router.get('/reader', async (req, res) => {
//     const readable = getReadableStream();
//     let chuncks = [];
//     readable.on('readable', async () => {
//         let chunk;
//         chunk = await req.read();
//         console.log('Stream is readable (new data received in buffer)');
//         while (null !== (chunk = readable.read())) {
//             console.log(`Read ${chunk.length} bytes of data...`);
//             chuncks.push(chunk);
//         }
//     });
// });

// const getReadableStream = async () => {
//     let path = BaseUrl + "/public/uploads/"
//     let fs = require('fs');
//     return await fs.readFileSync(path + '1656931898879logo.jpg');
// };

router.get('/home', isLoggedIn, async (req, res) => {
    // console.log("am here");
    res.cookie("ech_", req.query.id, { maxAge: 3000 * 1000 });
    res.redirect('/dashboard');
});
router.get('/dashboard', isLoggedIn, async (req, res) => {
    // console.log("am here");
    let currentuser = await currentUser(req);
    console.log("currentUser dashboard::", currentuser);
    res.render('dashboard', { profile: currentuser });
});
router.get('/churches/users/add', isLoggedIn, async (req, res) => {
    let countries = await new _DB('Countries');
    let country = JSON.parse(JSON.stringify(await countries.findWithRelatives()));
    console.log("countries:: ", country);
    res.render('churches/user_create', { layout: false, Countries: country });
});
router.post('/church/users', isLoggedIn, upload.single('logo'), async (req, res) => {
    try {
        console.log("am here", req.body);
        let data = req.body;
        data[req.file.fieldname] = "/public/uploads/" + req.file.filename;
        let churches = await new _DB('Churches');
        let user = await currentUser(req);
        let church = await churches.create(data, "user", user.id);
        console.log("churches:", church);
        // res.redirect('/');

    } catch (err) {
        var report = {
            status: false,
            notification: "Failed to add!",
        }
        var delfile = req.file.path;
        console.log("am here", delfile);
        fs.unlinkSync(delfile);
        console.log(err);
        // res.redirect('/');
    };
});
router.get('/user/churches', isLoggedIn, async (req, res) => {
    let user = await currentUser(req);
    res.render('church_pallet', { layout: false, churches: user.churches });
});

router.get('/user/churches', isLoggedIn, async (req, res) => {
    let user = await currentUser(req);
    res.render('church_pallet', { layout: false, churches: user.churches });
});
router.get('/logout', async (req, res) => {
    res.clearCookie("token");
    res.clearCookie("est_");
    res.clearCookie("ech_");
    res.redirect('/');
});

module.exports = router;