const lineApiService = require("../services/line-api-service");
const firebaseService = require("../services/firebase-service");

class LineMessaging {
  constructor() {}

  replyMessage(replyToken, message) {
    return new Promise(function(resolve, reject) {
      try {
        let _messages = [
          {
            type: "carousel",
            contents: [
              {
                type: "bubble",
                hero: {
                  type: "image",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                  url:
                    "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png"
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: message,
                      wrap: true,
                      weight: "bold",
                      size: "xl"
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      contents: [
                        {
                          type: "text",
                          text: "$49",
                          wrap: true,
                          weight: "bold",
                          size: "xl",
                          flex: 0
                        },
                        {
                          type: "text",
                          text: ".99",
                          wrap: true,
                          weight: "bold",
                          size: "sm",
                          flex: 0
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
                      style: "primary",
                      action: {
                        type: "uri",
                        label: "Add to Cart",
                        uri: "https://linecorp.com"
                      }
                    },
                    {
                      type: "button",
                      action: {
                        type: "uri",
                        label: "Add to wishlist",
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
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                  url:
                    "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png"
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "Metal Desk Lamp",
                      wrap: true,
                      weight: "bold",
                      size: "xl"
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      flex: 1,
                      contents: [
                        {
                          type: "text",
                          text: "$11",
                          wrap: true,
                          weight: "bold",
                          size: "xl",
                          flex: 0
                        },
                        {
                          type: "text",
                          text: ".99",
                          wrap: true,
                          weight: "bold",
                          size: "sm",
                          flex: 0
                        }
                      ]
                    },
                    {
                      type: "text",
                      text: "Temporarily out of stock",
                      wrap: true,
                      size: "xxs",
                      margin: "md",
                      color: "#ff5551",
                      flex: 0
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
                      flex: 2,
                      style: "primary",
                      color: "#aaaaaa",
                      action: {
                        type: "uri",
                        label: "Add to Cart",
                        uri: "https://linecorp.com"
                      }
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
                      flex: 1,
                      gravity: "center",
                      action: {
                        type: "uri",
                        label: "See more",
                        uri: "https://linecorp.com"
                      }
                    }
                  ]
                }
              }
            ]
          }
        ];
        //check call database
        if (message == "Order") {
          return firebaseService.getOrder().then(function(rsHouses) {
            _messages[0].text = rsHouses;
            console.log("rsHouses == ", rsHouses);
            console.log(
              "_messages[0].text = rsHouses; ",
              (_messages.contents.body.contents[0].text = rsHouses)
            );
            return lineApiService
              .reply(replyToken, _messages)
              .then(function(rs) {
                return resolve(rs);
              });
          });
        } else if (message == "Contact") {
          return firebaseService.getContact().then(function(rsHouses) {
            _messages[0].text = rsHouses;
            return lineApiService
              .reply(replyToken, _messages)
              .then(function(rs) {
                return resolve(rs);
              });
          });
        } else {
          return lineApiService.reply(replyToken, _messages).then(function(rs) {
            return resolve(rs);
          });
        }
      } catch (e) {
        return reject(e);
      }
    });
  }
}
module.exports = new LineMessaging();
