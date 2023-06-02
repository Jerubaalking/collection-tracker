const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const users = require("../../../database/models/users");
const fs = require('fs');
const { enrols } = require("../models/updates");
const { getPayload } = require("./getPayload");
const path = require("path");
const Controllers = require("../models/control");
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        res.render('superadmin/profile/index', { layout: false, id: await (await control.getCurrentSession()).userId });
    },
    list: async (req, res) => {

        const control = await new Controllers(req);
        let profile = JSON.parse(JSON.stringify(await (await control.findBy()).user({ where: { schoolId: await (await control.getCurrentSession()).schoolId }, include: [{ model: users }] })));
        console.log("profile", profile);
        res.render('superadmin/profile/list', { layout: false, profile: profile });
    },

    profile: async (req, res) => {
        const control = await new Controllers(req);

        let profile = await (await control.single()).enrols(req.params.id);
        console.log(profile);
        res.render('superadmin/profile/profile', { layout: false, enrol: profile });
    },
    create: async (req, res) => {

        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            // let schools = await finds.schools();
            let department = await (await control.find()).departments();
            let classes = await (await control.find()).classes();
            res.render('superadmin/profile/create', { layout: false, departments: department, classes: classes });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                if (req.file) {
                    try {
                        console.log('its post:');
                        let data = req.body;
                        data.role = 'user';
                        data.schoolId = await (await control.getCurrentSession()).schoolId;
                        data.social_link = JSON.stringify([data.facebook_link, data.twitter_link, data.linkedin_link])
                        await (await control.create()).user(data);
                        res.json({ status: true, notification: 'successfully added user!' })
                    } catch (err) {
                        res.json({ status: false, notification: 'failed to add user: ' + err.message })
                    }
                }

            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let profile = JSON.parse(JSON.stringify(await (await control.single()).userOpt({ where: { id: await (await control.getCurrentSession()).userId } })));
            let own = {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                address: profile.address,
                gender: profile.gender,
                birthday: profile.birthday,
                phone: profile.phone,
                blood_group: profile.blood_group,
            }
            console.log('req', req.url, profile, await (await control.getCurrentSession()).userId);
            res.render('superadmin/profile/edit', { layout: false, profile: own });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    if (req.file) {

                    } else {

                        let data = req.body;
                        let user = await (await control.single()).user(req.params.id);
                        if (data['name'] !== undefined) {
                            let oldFile = path.resolve(__dirname + '../../../../public/uploads/images/users/' + user.name.split(' ').join('_') + '.jpg');
                            let newPath = path.resolve(__dirname + '../../../../public/uploads/images/users/' + data.name.split(' ').join('_') + '.jpg');

                            if (oldFile != newPath) {
                                let fileReadStream = await new fs.ReadStream(oldFile);
                                let fileWriteStream = await new fs.WriteStream(newPath);
                                await fileReadStream.pipe(await fileWriteStream, { end: true });
                                await fileWriteStream.once('close', async () => {
                                    fs.unlinkSync(oldFile);
                                    await (await control.update()).user(user.id, data);
                                });
                                await fileWriteStream.once('error', async () => {
                                    fs.unlinkSync(newPath);
                                    await (await control.update()).user(user.id, data);
                                });
                                res.clearCookie('token');
                                res.clearCookie('est_');
                                res.json({ status: true, notification: 'successfully updated user!', refreshRoute: '/' });

                            } else {


                                if (user.email != req.body.email) {
                                    await (await control.update()).user(user.id, data);
                                    res.clearCookie('token');
                                }
                                await (await control.update()).user(user.id, data);
                                res.json({ status: true, notification: 'successfully updated user!', refreshRoute: '/' });
                            }

                        } else {
                            if (data['current_password'] !== undefined) {
                                if (data.password == data.confirm_password) {
                                    console.log('.... am here ........>>>>>>>>>>>>>>>>.');
                                    data.password = data.current_password;
                                    res.clearCookie('token');
                                    res.clearCookie('est_');
                                }
                            }
                            await (await control.update()).user(user.id, data);
                            res.json({ status: true, notification: 'successfully updated user!', refreshRoute: '/' });
                        }
                    }

                } catch (err) {
                    res.json({ status: false, notification: 'failed to update user: ' + err.message })
                }
            }
        }

    }


}