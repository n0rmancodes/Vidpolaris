const https = require("https");

module.exports = {
    request: function (url) {
        return new Promise((resolve, reject) => {
            https.get(encodeURI(url), (resp) => {
                let data = "";

                // A chunk of data has been recieved.
                resp.on("data", (chunk) => {
                    data += chunk;
                });

                // The whole response has been received.
                resp.on("end", () => {
                    resolve(JSON.parse(data));
                });

            }).on("error", (err) => {
                reject(err.message);
            });
        });
    }
}