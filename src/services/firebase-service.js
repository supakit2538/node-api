const firebase = require("firebase-admin");
const serviceAccount = require("../../linebot-43484-firebase-adminsdk-eyv4h-3d2476ffec.json");
var db, ref;

class FirebaseService {
  constructor() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: "https://linebot-43484.firebaseio.com"
    });

    db = firebase.database();

    ref = db.ref("Order");
    ref = db.ref("Contact");
  }

  getHogwartHouses() {
    return new Promise(function(resolve, reject) {
      try {
        return ref.once("value", function(snapshot) {
          let _order = snapshot.val();

          return resolve(JSON.stringify(_order));
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
}
module.exports = new FirebaseService();
