
const models = require('../../../database/models/module_exporter');
// const authorizers = require("../../../database/models/authorizers");
const i18n = require("../../helpers/languages/i18n.config");
const Session = require('./session');
/**
 * @class {Controllers} Controller used to extend session
 * used as a middleware between request and db query
 * Future use is to try to use it to carry out validation
 */

class Controllers extends Session {
    constructor(req) {
        super(req);

    }
    async authorize(action) {
        let authority = JSON.parse(JSON.stringify(await authorizers.findOne({ where: { title: action } })));

        return await authority;
    }
    async find(model, opt) {
        return JSON.parse(JSON.stringify(await models[model].findAll(opt)));
    }
    async findCount(model, opt) {
        return JSON.parse(JSON.stringify(await models[model].findCountBy(opt)));
    }
    async single(model, opt) {
        return JSON.parse(JSON.stringify(await models[model].findOne(opt)));
    }
    async create(model, data) {
        return JSON.parse(JSON.stringify(await models[model].build(data).save()));
    }
    async update(model, data, opt) {
        return JSON.parse(JSON.stringify(await models[model].update(data, opt)));
    }
    async sum(model, opt) {
        return JSON.parse(JSON.stringify(await models[model].findOne(opt)));
    }
    async delete(model, opt) {
        return JSON.parse(JSON.stringify(await models[model].destroy(opt)));
    }
    async getParams(req) {
        // console.log(await this._request.url);
        if (this._request.url.includes('?')) {
            let dataArray = await [...this._request.url.split('?')[1].split('&')];
            let data = {};
            dataArray.forEach(s => {
                data[s.split('=')[0]] = s.split('=')[1];
            });

            data = JSON.parse(JSON.stringify(await data));
            return data;
        }
    }

}

module.exports = Controllers;