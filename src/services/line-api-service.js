const request = require("request");
const apiToken =
  "ug4qNS2UBOuBDak6c9ECwjU/q+TPraOVdThgTxM8huUOP+LIfmpP0CPazOyDPPC+XrUYhyA1/ge2e1gmWpnO8ujJu9QddIMdCA28Iq7s32mfDY/Txfa6rGiqpZohz7nClMDgmX7VGi/vLUOlA0vp4QdB04t89/1O/w1cDnyilFU=";
const apiRoute = "https://api.line.me/v2/bot/message/reply";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + apiToken
};

class LineAPIService {
  constructor() {}

  reply(replyToken, messages) {
    return new Promise(function(resolve, reject) {
      try {
        let body = JSON.stringify({
          replyToken: replyToken,
          messages: {
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
                      text: "Arm Chair, White",
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
        });
        return request.post(
          {
            url: apiRoute,
            headers: headers,
            body: body
          },
          (err, res, body) => {
            console.log("status = " + res.statusCode);
            return resolve(res.statusCode);
          }
        );
      } catch (e) {
        return reject(e);
      }
    });
  }
}
module.exports = new LineAPIService();
