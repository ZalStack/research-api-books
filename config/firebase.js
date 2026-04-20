const admin = require("firebase-admin");

//? Path ke file service account key
const serviceAccount = require("../serviceAccountKey.json");

//? Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
