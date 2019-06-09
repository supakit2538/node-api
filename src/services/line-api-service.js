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
          messages: messages
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
