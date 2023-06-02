
const helper = require("./helper");
const crypto = require('crypto');
const dotenv = require('dotenv');
// const BaseUrl = require("../../../base");
const PASSWORD_LENGTH = 64;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';
const BYTE_TO_STRING_ENCODING = 'hex';

/**
 * 
 * @param {url} url 
 * @param {cookies} cookies 
 * @returns pdfTemporaryUrl
 */
// const generatePDF = async (url, cookies) => {
//     let cookieValues = "";
//     // var cookieValues = [];
//     for (const key in cookies) {
//         if (Object.hasOwnProperty.call(cookies, key)) {
//             cookieValues = cookieValues + `${[key]}=${cookies[key]};`;
//         }
//     }
//     let path = `${BaseUrl}/backend/catch/pdf/${await generateRandom(12)}.pdf`;
//     try {
//         const p = await htmlToPdf(url, {
//             allow: `${BaseUrl}/backend/catch/pdf`,
//             customHeader: [
//                 ['Cookie', cookieValues]
//             ], output: `${BaseUrl}/backend/catch/pdf/${await generateRandom(12)}.pdf`, pageSize: 'letter'
//         });
//         return await p;
//     } catch (err) {
//         throw err;
//     }

// }


const capitalize = s => s.replace(/./, c => c.toUpperCase());

/** set the church selected by user 
 * @param User object
 * @param churchId integer
*/
// const setChurch = async (churchId) => {
//     const { _DB } = require('../../../database/schemas');
//     const Churches = await (await new _DB('Churches'));
//     let church = JSON.parse(JSON.stringify(await Churches.idFindWithRelative(churchId)));
//     return church;

// };

/** Service
 * This is used by the router controller to retrive database objects for serving the view
 */
// const create = async (model, currentuser) => {
//     const { _DB, } = require("../../../database/schemas");
//     try {
//         // var currentuser = await currentUser(req);
//         console.log("model in service", model, currentuser);
//         var models = new _DB(model, currentuser);
//         console.log("create service: ", model);
//         var data = await models.relatives();
//         var u = new Object();
//         u.layout = false;
//         data = await models.relatives();
//         if (!data.length <= 0) {
//             for (var d = 0; d < data.length; d++) {
//                 console.log("D::", JSON.stringify(data[d]).split(':')[0]);
//                 var db1 = new _DB(data[d], currentuser);
//                 console.log("model1", await db1.findWithRelatives());
//                 u[data[d]] = JSON.parse(JSON.stringify(await db1.findWithRelatives()));
//             };
//             console.log("U value::", u);
//             return u;
//         } else {
//             console.log("U value::", u);
//             return u;
//         }

//     } catch (err) {
//         console.log("ERRor:", err);
//     }
// };
// /** Service 
//  * This is used by the router controller to retrive database objects for serving the view
//  */
// const edit = async (model, id, currentuser) => {
//     const { _DB, } = require("../../../database/schemas");
//     try {
//         var models = new _DB(model, currentuser);
//         var data = await models.idFindWithRelative(id);
//         data = JSON.parse(JSON.stringify(data));
//         let rel = await models.relatives();
//         var u = new Object();
//         u.layout = false;
//         u[model] = data;
//         console.log("rel::", rel);
//         if (rel != undefined) {
//             for (let i = 0; i < rel.length; i++) {
//                 let db1 = await new _DB(rel[i], currentuser);
//                 u[rel[i]] = JSON.parse(JSON.stringify(await db1.findWithRelatives()));
//             };
//             // console.log("data at serve", u);
//             return u;
//         } else {
//             return u;
//         }
//     } catch (err) {
//         console.log("ERRor:", err);
//     }
// };
/** Tithe
 * This function is used to generate tithe number
 */
const generateUniqueIdentifier = async (initial = "SCT" || new String()) => {
    try {
        if (initial == "undefined") {
            let g = crypto.generateKeySync('hmac', { length: 36 });
            console.log(g);
            return `STC-${g.export().toString('hex')}`;
        } else {
            let g = crypto.generateKeySync('hmac', { length: 31 });
            console.log(await g.export().toString('hex'));
            return `${initial} - ${g.export().toString('hex')}`;;
        }
    } catch (err) {
        throw err;
    }
};
/**
 * random generator.
 * @function
 * @param {string} count - specifies the length of the output string.
 */
const generateRandom = async (count = 7 || new Number()) => {
    var _sym = 'BCDFGHJKLMNPQRSTVWXYZ1234567890';
    var str = '';

    for (var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    };
    if (!str.length < count) {
        return str;                  // use the continuation
    } else {
        return null;
    };
};
const passwordHash = (password = new String()) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);
        crypto.pbkdf2(password.toString('utf8'), salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (err, derivedKey) => {
            if (err) reject(err);
            // console.log(derivedKey.toString('hex'));
            var res = {
                hashHex: derivedKey.toString('hex'),
                hashBase64: derivedKey.toString('base64'),
                salt: salt,
                passwordLength: PASSWORD_LENGTH,
                iterations: ITERATIONS
            }
            resolve(res); // '3745e48...08d59ae'
        });
    });
};
/**
 * hash password with sha512-256.
 * @function
 * @param {string} password - List of required fields.
 */
const passwordHashVerify = (password = new String(), salt = new String(), dbHash = new String()) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (err, derivedKey) => {
            if (err) reject(err);
            // console.log(derivedKey.toString('hex'));
            var res = {
                hashHex: derivedKey.toString('hex'),
                hashBase64: derivedKey.toString('base64'),
                salt: salt,
                passwordLength: PASSWORD_LENGTH,
                iteration: ITERATIONS
            }
            if (dbHash == res.hashHex || dbHash == res.hashBase64) {
                resolve(true);
            } else {
                resolve(false)
            }// '3745e48...08d59ae'
        });
    });
};
// const currentUser = async (req) => {
//     const { _DB } = require('../../../database/schemas');

//     const { spawnJwtPayload } = require("./handlers");
//     try {
//         let token = req.cookies.token;
//         let est_ = req.cookies.est_;
//         let ech_ = req.cookies.ech_;
//         let payload = await spawnJwtPayload(token, est_);
//         /** Return the user global data */
//         var users = await new _DB('Users');
//         // let churches = new _DB('Churches');
//         var sysUser = JSON.parse(JSON.stringify(await users.emailFind(payload.email)));
//         if (sysUser) {
//             // console.log('sysUser:::', sysUser);
//             let user = JSON.parse(JSON.stringify(await users.idFindWithRelative(sysUser.id)));
//             if (user.type == 'superadmin') {
//                 /** allow to view all entire system 
//                      * this value is used to provide info of the selected church 
//                      * */
//                 if (ech_ != 0) {
//                     sysUser.selectedChurch = await setChurch(ech_);
//                     return sysUser;
//                 } else {
//                     return sysUser;
//                 }
//             } else {
//                 if (user.type == 'admin') {
//                     /** allow user to view one church 
//                      * this value is used to provide info of the selected church
//                     */
//                     if (ech_ != 0) {
//                         user.selectedChurch = await this.setChurch(ech_);
//                         return user;
//                     } else {
//                         return user;
//                     }
//                 } else {
//                     /*** bind the church id from the members table */
//                     if (ech_ != 0) {
//                         user.selectedChurch = await this.setChurch(ech_);
//                         return user;
//                     } else {
//                         return user;
//                     }
//                 }
//             }
//         }
//     } catch (err) {
//         return err;
//     }
// };
module.exports = { generateRandom, generateUniqueIdentifier, passwordHash, passwordHashVerify };