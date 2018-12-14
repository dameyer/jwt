# jwt
node js that shows how to get a session id from Salesforce using jwt

create private key 
    openssl req -out CSR.csr -new -newkey rsa:2048 -nodes -keyout PrivateKey.key

create SFDC connected app

//jwt_config.js
~~~~
module.exports = {
    LOGINURL: 'https://login.salesforce.com',
    CONSUMERKEY: 'CONNECTEDAPPCONSUMEKEY',
    USERNAME: 'USERNAMETOGETSESSIONIDFOR'
}
~~~~
