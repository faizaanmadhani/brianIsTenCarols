var fs = require('fs');

function obj (name, question, answer) {
  this.name = name;
  this.question = question;
  this.answer = answer;
}

exports.run = function(api, event) {
  api.sendMessage("Wonderfulness! This works?", event.thread_id);
    var array = event.body.split(" ");
    array.splice(0, 1);
    var word = array.join(" ");
    word = word.split(";");

    var question = word[0];
    var answer = word[1];

    var brian = new obj(event.sender_id, question, answer);
    api.sendMessage(JSON.stringify((brian), event.thread_id);
    var jsonData = JSON.stringify(brian)

    // fs.writeFile("storage.json", jsonData, function(err) {
    // if(err) {
    //     return console.log(err);
    //   }
    // });
    var stream = fs.createWriteStream("storage.json");
    stream.once('open', function(fd) {
      stream.write(jsonData);
      stream.end();
    });
    api.sendMessage("Remembered! I'll be asking you this soon, so don't forget!", event.thread_id);

  };
