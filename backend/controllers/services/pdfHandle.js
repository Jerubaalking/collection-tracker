const htmlToPdf = require('wkhtmltopdf');
const fs = require('fs');
const https = require('https');
const axios = require('axios').default;
const { generateRandom } = require('./service');
const path = require('path');
const { URLSearchParams } = require('url');
const { Stream } = require('stream');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const BaseUrl = path.resolve(__dirname + '../../../');



const makePDF = async function (options = { cookies: new Array(), data: {} }, url = '', pages = 0) {
    let cookies = options.cookies;
    let cookieValues = "";
    let nreportUrlSingle = [];
    if (pages) {
        for (let page = 0; page <= pages; page++) {
            let reportUrlSingle = `${process.env.HTTPSSITE}:${process.env.PORT}${url}`;
            let oop = {}
            var name = `${await generateRandom(12)}.pdf`;
            for (let itm of options.data) {
                for (let i in itm) {
                    if (!reportUrlSingle.includes('?')) {
                        reportUrlSingle += `?${i} = ${itm[i]}&`;
                    } else {
                        if (i == 'page') {
                            oop['page'] = page + 1;
                            oop['limit'] = 29;
                            reportUrlSingle += `${i}=${page + 1}&`;
                        } else {
                            reportUrlSingle += `${i}=${itm[i]}& `;
                        }
                    }
                }
                // oop['name'] = name;
            }
            nreportUrlSingle.push({ file: reportUrlSingle.split(' ').join(''), options: oop });
        }
    } else {
        var name = `${await generateRandom(12)}.pdf`;
        nreportUrlSingle.push({ file: `${process.env.HTTPSSITE}:${process.env.PORT}${url}` });
    }


    console.log('Cookie Value:::', cookieValues);
    // var cookieValues = [];
    for (const key in cookies) {
        if (Object.hasOwnProperty.call(cookies, key)) {
            cookieValues = cookieValues + `${[key]}=${cookies[key]};`;
        }
    }
    axios.defaults.headers.common['Cookie'] = cookieValues;
    let outputPath = path.resolve(path.basename('./') + `/backend/catch/pdf/${name}`);
    const ans = { name: name, reportUrl: nreportUrlSingle, path: path.resolve(path.basename('./') + `/backend/catch/pdf/${name}`) };
    // cookies['Content-type'] = 'application/x-www-form-urlencoded';
    console.log(nreportUrlSingle);
    let uurl = nreportUrlSingle[0].file;
    let ccookieValues = cookieValues;
    // cookieValues = { 'Authorization': cookieValues };
    // console.log(cookies);
    // let optionss = {
    //     withCredentials: true,
    //     timeOut: 2000,
    //     method: 'GET',
    //     headers: [cookieValues].toString(),
    //     httpsAgent: new https.Agent({
    //         key: https.globalAgent.options.key,
    //         cert: https.globalAgent.options.cert,
    //         ca: https.globalAgent.options.cert,
    //     })
    // };
    console.log({ 'cookie': cookies }, https.globalAgent.options.ca + '/localhost+1.pem');

    let page = 0;
    let responseData = [];
    console.log(nreportUrlSingle[page]);
    let tempHTML = path.resolve(path.basename('./') + '/backend/catch/html/temp.html');
    let totalPages = 1;
    for (page; page <= totalPages; page++) {
        const response = await axios.get(nreportUrlSingle[page].file);
        console.log(response.data);
        responseData = responseData.concat(response.data);
        page = response.data.page + 1;
        totalPages = response.data.total_pages;
    }
    await fs.writeFileSync(tempHTML, responseData.toString());

    try {
        let maker = await htmlToPdf('file:///' + tempHTML, {
            // customHeader: [
            //     ['Cookies', cookieValues],
            // ],
            allow: path.resolve(path.basename('./') + '/backend/catch/pdf/'),
            pageSize: 'A4',
            marginBottom: '13mm',
            marginTop: '15mm',
            marginLeft: '5mm',
            marginRight: '5mm',
            output: outputPath,
            enableLocalFileAccess: true,
            outline: true,
            // sslVerify: false,
            // sslCrtPath: `${await https.globalAgent.options.ca}/localhost+1-key.pem`,
        }, async (err, stream) => {
            // console.log(err);
            return await stream;

        });

        return { maker: maker, info: ans };
    } catch (err) {
        console.log('OUT ERROR::', err);
    }

}

module.exports = { makePDF };