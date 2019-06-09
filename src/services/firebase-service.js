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
          return resolve(JSON.stringify(_order));
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
          console.log("reply contact = " + JSON.stringify(_order));
          let flex = {
            type: "flex",
            altText: "Flex Message",
            contents: {
              type: "carousel",
              contents: [
                {
                  type: "bubble",
                  hero: {
                    type: "image",
                    url:
                      "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png",
                    size: "full",
                    aspectRatio: "20:13",
                    aspectMode: "cover"
                  },
                  body: {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "Arm Chair, White",
                        size: "xl",
                        weight: "bold",
                        wrap: true
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "$49",
                            flex: 0,
                            size: "xl",
                            weight: "bold",
                            wrap: true
                          },
                          {
                            type: "text",
                            text: ".99",
                            flex: 0,
                            size: "sm",
                            weight: "bold",
                            wrap: true
                          }
                        ]
                      }
                    ]
                  },
                  footer: {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                      {
                        type: "button",
                        action: {
                          type: "uri",
                          label: "Add to Cart",
                          uri: "https://linecorp.com"
                        },
                        style: "primary"
                      },
                      {
                        type: "button",
                        action: {
                          type: "uri",
                          label: "Add to whishlist",
                          uri: "https://linecorp.com"
                        }
                      }
                    ]
                  }
                },
                {
                  type: "bubble",
                  hero: {
                    type: "image",
                    url:
                      "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png",
                    size: "full",
                    aspectRatio: "20:13",
                    aspectMode: "cover"
                  },
                  body: {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "Metal Desk Lamp",
                        size: "xl",
                        weight: "bold",
                        wrap: true
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        flex: 1,
                        contents: [
                          {
                            type: "text",
                            text: "$11",
                            flex: 0,
                            size: "xl",
                            weight: "bold",
                            wrap: true
                          },
                          {
                            type: "text",
                            text: ".99",
                            flex: 0,
                            size: "sm",
                            weight: "bold",
                            wrap: true
                          }
                        ]
                      },
                      {
                        type: "text",
                        text: "Temporarily out of stock",
                        flex: 0,
                        margin: "md",
                        size: "xxs",
                        color: "#FF5551",
                        wrap: true
                      }
                    ]
                  },
                  footer: {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                      {
                        type: "button",
                        action: {
                          type: "uri",
                          label: "Add to Cart",
                          uri: "https://linecorp.com"
                        },
                        flex: 2,
                        color: "#AAAAAA",
                        style: "primary"
                      },
                      {
                        type: "button",
                        action: {
                          type: "uri",
                          label: "Add to wish list",
                          uri: "https://linecorp.com"
                        }
                      }
                    ]
                  }
                },
                {
                  type: "bubble",
                  body: {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                      {
                        type: "button",
                        action: {
                          type: "uri",
                          label: "See more",
                          uri: "https://linecorp.com"
                        },
                        flex: 1,
                        gravity: "center"
                      }
                    ]
                  }
                }
              ]
            }
          };
          return resolve(flex);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
}
module.exports = new FirebaseService();
