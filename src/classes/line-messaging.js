const lineApiService = require("../services/line-api-service");
const firebaseService = require("../services/firebase-service");

class LineMessaging {
  constructor() {}

  replyMessage(replyToken, message) {
    return new Promise(function(resolve, reject) {
      try {
        let _messages = [
          {
            type: "text",
            text: message
          }
        ];
        //check call database
        if (message == "Order") {
          return firebaseService.getOrder().then(function(rsHouses) {
            _messages[0].text = rsHouses;
            console.log(
              "_messages[0].text = rsHouses; ",
              (_messages[0].text = rsHouses)
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
