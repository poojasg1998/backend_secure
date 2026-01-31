

const admin = require('firebase-admin');
// var serviceAccount = require("./config/google-services.json");
const serviceAccount = require('/etc/secrets/google-services.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;