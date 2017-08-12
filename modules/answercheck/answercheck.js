var fs = require('fs');
var indico = require('indico.io');
indico.apiKey = "ab83001ca5c484aa92fc18a5b2d6585c";

exports.run = function(api, event) {
        fs.readFile("modules/trivia/answers.txt", 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }

        var response = function(res) {
            var keywords = JSON.stringify(res);
            api.sendMessage(keywords, event.thread_id);
            indico.keywords(event.body.substring(2))
            .then(function(res) {
                var answerKeywords = Object.keys(res);
                // api.sendMessage(keywords, event.thread_id);
                var boop = 0 ;
                for (var i = 0; i < keywords.length; i++){
                    if (answerKeywords.indexOf(keywords[i]) > -1){
                        boop++;
                    }
                }
                if (boop / keywords.length > .75){
                    api.sendMessage("You got it right!", event.thread_id)
                }
                else{
                    api.sendMessage("IT'S WRONG", event.thread_id)
                }

            }).catch(logError);
        }
        var logError = function(err) { api.sendMessage(err, event.thread_id); }

        // single example
        indico.keywords(data)
          .then(response)
          .catch(logError);
        });
};
