const firebase = require("firebase-admin");
const serviceAccount = require("../../linebot-43484-firebase-adminsdk-eyv4h-3d2476ffec.json");
var db, ref, refCont;

class FirebaseService {
  constructor() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: "https://linebot-43484.firebaseio.com"
    });

    db = firebase.database();

    ref = db.ref("Order");
    refCont = db.ref("Contact");
  }

  getOrder() {
    return new Promise(function(resolve, reject) {
      try {
        return ref.once("value", function(snapshot) {
          let _order = snapshot.val();

          msg = {
            type: "template",
            altText: "this is a carousel template",
            template: {
              type: "carousel",
              columns: [
                {
                  thumbnailImageUrl:
                    "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                  title: "this is menu",
                  text: "description",
                  actions: [
                    {
                      type: "postback",
                      label: "Buy",
                      data: "action=buy&itemid=111"
                    },
                    {
                      type: "postback",
                      label: "Add to cart",
                      data: "action=add&itemid=111"
                    },
                    {
                      type: "uri",
                      label: "View detail",
                      uri: "http://example.com/page/111"
                    }
                  ]
                },
                {
                  thumbnailImageUrl:
                    "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                  title: "this is menu",
                  text: "description",
                  actions: [
                    {
                      type: "postback",
                      label: "Buy",
                      data: "action=buy&itemid=222"
                    },
                    {
                      type: "postback",
                      label: "Add to cart",
                      data: "action=add&itemid=222"
                    },
                    {
                      type: "uri",
                      label: "View detail",
                      uri: "http://example.com/page/222"
                    }
                  ]
                }
              ]
            }
          };

          return resolve(JSON.stringify(msg));
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
  getContact() {
    return new Promise(function(resolve, reject) {
      try {
        return refCont.once("value", function(snapshot) {
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
