var request = require('request');
var fs = require('fs');
var weight = 0.5;

exports.run = function(api, event) {
  // var array = event.body.split(" ");
  // weightOfCustom = array[1]

  // if (Math.random() < weight && fs.exists(event.sender_id + '.json')){
    api.sendMessage(event.sender_id, event.thread_id);
    fs.readFile(event.sender_id +'.json', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      var data = JSON.parse(data.substring(0, data.length - 2) + ']')
      api.sendMessage(data[0].q, event.thread_id);
      fs.writeFile("modules/trivia/answers.txt", data[0].a, function(err) {
          if(err) {
              return console.log(err);
          }
      });
    });
  //
  // } else {
  //   //get trivia DB question
  //   request.get('https://opentdb.com/api.php?amount=1', (err, response, body) => {
  //       body = JSON.parse(body);
  //       fs.writeFile("modules/trivia/answers.txt", body.results[0].correct_answer, function(err) {
  //           if(err) {
  //               return console.log(err);
  //           }
  //       });
  //       if (body.results[0].type == "boolean"){
  //           api.sendMessage(body.results[0].question + " (True or False)", event.thread_id);
  //       }
  //       else{
  //           api.sendMessage(body.results[0].question, event.thread_id);
  //       }
  //   });
  // }
};
