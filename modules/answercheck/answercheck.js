var fs = require('fs');
var indico = require('indico.io');
indico.apiKey = "ab83001ca5c484aa92fc18a5b2d6585c";

exports.run = function(api, event) {
        fs.readFile("modules/trivia/answers.txt", 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }

        var response = function(res) {
            var keywords = Object.keys(res)
            // api.sendMessage(keywords, event.thread_id);
            indico.keywords(event.body.substring(2))
            .then(function(res) {
                var answerKeywords = Object.keys(res);
                var boop = 0 ;
                for (var i = 0; i < keywords.length; i++){
                    if (answerKeywords.indexOf(keywords[i].toLowerCase()) > -1){
                        boop++;
                    }
                }
                // api.sendMessage(answerKeywords, event.thread_id);
                if (boop / keywords.length > .75){
                    api.sendMessage("You got it right!", event.thread_id)
                }
                else{
                    api.sendMessage("IT'S WRONG. THE CORRECT ANSWER WAS " + data, event.thread_id)
                }

            }).catch(logError);
        }
        var logError = function(err) { api.sendMessage(err, event.thread_id); }
        if (data.toLowerCase().replace(/ /g,'') == event.body.substring(2).toLowerCase().replace(/ /g,'')){
            api.sendMessage("YOU GO IT RIGHT OMG YOU'RE SO SMART WOW", event.thread_id);
        }
        else{// single example
            indico.keywords(data)
              .then(response)
              .catch(logError);
        }
    });

};
