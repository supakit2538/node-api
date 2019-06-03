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
  }

  getHogwartHouses() {
    return new Promise(function(resolve, reject) {
      try {
        return ref.once("value", function(snapshot) {
          let _Order = snapshot.val();

          return resolve(JSON.stringify(_Order));
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
}
module.exports = new FirebaseService();
