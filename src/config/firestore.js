const { Firestore } = require('@google-cloud/firestore');
const path = require('path');


const credentialsPath = path.join(__dirname, '../config/firebase-service-account.json');

const db = new Firestore({
  projectId: 'latihan-scancare',  
  keyFilename: credentialsPath,  
});

module.exports = { db };
