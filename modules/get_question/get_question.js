var request = require('request');
var fs = require('fs');
var weight = 0.5;

exports.run = function(api, event) {
  var array = event.body.split(" ");    
  if (typeof array === array){
    weight = min(1, max(0, array[1]));
  }
  if (Math.random() <= weight){
    //read from personal database 
    
  } else {
    request.get('https://opentdb.com/api.php?amount=1', (err, response, body) => {
        body = JSON.parse(body);
        fs.writeFile("modules/trivia/answers.txt", body.results[0].correct_answer, function(err) {
            if(err) {
                return console.log(err);
            }
        });
        if (body.results[0].type == "boolean"){
            api.sendMessage(body.results[0].question + " (True or False)", event.thread_id);
        }
        else{
            api.sendMessage(body.results[0].question, event.thread_id);
        }
    });
  }
};
