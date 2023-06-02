const https = require('https')
var options = {
    hostname: "https://localhost",
    port: 5006,
    path: "/invoices/report/pdf",
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Length': Buffer.byteLength(post_data)
    }
};

var req = https.request(options, function (res) {
    res.setEncoding('utf8');
    var body = '';

    res.on('data', function (chunk) {
        body = body + chunk;
    });

    res.on('end', function () {
        console.log("Body :" + body);
        if (res.statusCode !== 200) {
            callback("Api call failed with response code " + res.statusCode);
        } else {
            callback(null);
        }
    });

});
