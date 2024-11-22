const admin = require("firebase-admin");

// kredensial dari file service account
const serviceAccount = require("../path/to/your-service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com", 
});

const db = admin.firestore();

module.exports = { admin, db };
