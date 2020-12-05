const admin = require("firebase-admin");
const { FIREBASE_SERVICE_KEY } = require("./index");

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_SERVICE_KEY),
  databaseURL: "https://shortlink-6d74d.firebaseio.com",
});

module.exports = {
  auth: admin.auth(),
};
