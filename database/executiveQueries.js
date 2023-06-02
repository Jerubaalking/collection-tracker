const { passwordHash } = require('../backend/controllers/services/service');
const models = require('./models/module_exporter');
const { Op } = require('./mysql');
module.exports = async executeInitialQueries => {

    try {

        const MAIN = require('./seeds/rearranger');
        for (const _main in MAIN) {
            for (const array in MAIN[_main][1].lists) {
                for (const array1 in MAIN[_main][1].lists[array]) {
                    console.log('i tried here:::::', MAIN[_main][1].lists[array][array1]);
                    // console.log('started');
                    let dataObject = {};
                    for (const key in MAIN[_main][1].indexes) {
                        // console.log(MAIN[_main][1].indexes[key][0], MAIN[_main][1].lists[array]);
                        // dataObject[MAIN[_main][1].indexes[key]] = null;
                        for (const key1 in MAIN[_main][1].indexes[key]) {
                            // console.log('main key',MAIN[_main][1].indexes[key][key1]);
                            dataObject[MAIN[_main][1].indexes[key][key1]] = MAIN[_main][1].lists[array][array1][key1];

                        }
                    }
                    console.log(dataObject);
                    switch (MAIN[_main][0]) {
                        case models.roles:
                            console.log('...creating roles::');
                            await models.roles.create(dataObject);
                            break;
                        case models.languages:
                            console.log('...creating languages::', dataObject);
                            await models.languages.create(dataObject);

                            break;

                        case models.sessions:
                            console.log('...creating sessions::');
                            await models.sessions.create(dataObject);
                            break;

                        case models.countries:
                            console.log('...creating regions::');
                            await models.countries.create(dataObject);
                            break;
                        case models.menus:
                            console.log('...creating menus::');
                            let menu = await models.menus.create(dataObject);
                            var role = await models.roles.findOne({ where: { id: 1 } });
                            await menu.addRole(role);
                            break;
                        case models.users:
                            // console.log('...creating users::', await role);
                            // var session = await sessions.findOne({ where: { id: 1 } });
                            let its = await passwordHash('@73N@');
                            its['hash'] = its.hashHex;

                            var user = await models.users.build(dataObject);
                            await user.save();
                            var lang = await models.languages.findOne({ where: { id: 1 } });
                            await user.addLanguage(await lang);
                            var contact = await models.contacts.build(dataObject);
                            await contact.save();
                            await user.addContact(await contact);
                            var auth = await models.authentications.build(its);
                            await auth.save();
                            await contact.addAuthentication(await auth);
                            var address = await models.addresses.build(dataObject);
                            await address.save();
                            await user.addAddress(await address);

                            var role = await models.roles.findOne({ where: { id: 1 } });
                            await role.addUser(await user);

                            break;
                        case models.regions:
                            console.log('...creating regions::');
                            var country = await models.countries.findOne({ where: { id: 1 } });
                            var region = await models.regions.create(dataObject);
                            await country.addRegion(await region);
                            break;

                        default:
                            break;
                    }
                }
            }
        }
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}