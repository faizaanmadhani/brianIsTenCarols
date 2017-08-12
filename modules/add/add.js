var fs = require('fs');
var count;
var something;
// var request = require('request');
// var i = 0;
// var indexes = {};
//
var Nogal = function (n, q, a) {
    this.n = n
    this.q = q
    this.a = a;
};

exports.run = function(api, event) {
  api.sendMessage("Wonderfulness! This works?", event.thread_id);
    var array = event.body.split(" ");
    array.splice(0, 1);
    var word = array.join(" ");
    word = word.split(";");

    var question = word[0];
    var answer = word[1];

    var kailas = new Nogal(event.sender_id, question, answer);

    var jsonData = JSON.stringify(kailas) + ", ";


    if (fs.existsSync(event.sender_id + '.json')) {
      fs.appendFile(event.sender_id + '.json', jsonData, function (err) {
        if (err) throw err;
      });
    }
    else {
      jsonData = '[' + jsonData;
      fs.writeFile(event.sender_id + '.json', jsonData, 'utf8');
    }

    api.sendMessage("Saved! We'll be asking this soon!", event.thread_id);


};
