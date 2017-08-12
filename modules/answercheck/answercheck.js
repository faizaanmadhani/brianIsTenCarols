var fs = require('fs');

exports.run = function(api, event) {
        fs.readFile("modules/trivia/answers.txt", 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          api.sendMessage(data, event.thread_id);
        });
};
