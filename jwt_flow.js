/*
create private key 
    openssl req -out CSR.csr -new -newkey rsa:2048 -nodes -keyout PrivateKey.key
create SFDC connected app

//jwt_config.js
module.exports = {
    LOGINURL: 'https://login.salesforce.com',
    CONSUMERKEY: 'CONNECTEDAPPCONSUMEKEY',
    USERNAME: 'USERNAMETOGETSESSIONIDFOR'
}
*/


let config = require('./jwt_config.js'),
    request = require('request'),
    jwt = require('jsonwebtoken'),
    key = require('fs').readFileSync('./privateKey.key', 'utf8'),
    bUrl = config.LOGINURL,
    tokenUrl = bUrl + '/services/oauth2/token';


var options = {
    issuer: config.CONSUMERKEY,
    audience: bUrl,
    expiresIn: 180,
    algorithm: 'RS256'
};
var token = jwt.sign({ prn: config.USERNAME }, key, options);

var post = {
    uri: tokenUrl,
    form: {
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': token
    },
    method: 'post'
};

console.log('<<<<Start>>>>');

console.log(post);

console.log('<<<<Stop>>>>');

request(post, function(err, res, body) {
    console.log('err=>' + err);
    console.log('statusCode=>' + res.statusCode);
    console.log('\nbody=>' + body);
    var resString = JSON.parse(body);
    console.log('\ntoken=>' + resString.access_token+'\n');
    console.log(resString.instance_url + '/secur/frontdoor.jsp?sid=' +
        resString.access_token);
});
