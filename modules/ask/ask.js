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

    var jsonData = JSON.stringify(kailas);


    if (fs.existsSync('./' + event.sender_id + '.json')) {
      fs.appendFile('./' + event.sender_id + '.json', jsonData, function (err) {
        if (err) throw err;
      });
      //count = fs.readFile('./' + event.sender_id + '.cnt.json');
      //count.parseInt;
      //fs.writeFile('./' + event.sender_id + '.cnt.json', count + 1, 'utf8');
    }
    else {
      fs.writeFile('./' + event.sender_id + '.json', jsonData);
      fs.writeFile('./' + event.sender_id + '_cnt.txt', '1');
    }

    api.sendMessage("Saved! We'll be asking this soon!", event.thread_id);


};




    // fs.readFile('./' + event.sender_id, handleFile)
    //
    // function handleFile(err, data) {
    //     if (err) throw err
    //     obj = JSON.parse(data)
    // }



    // var stream = fs.createWriteStream("storage.json");
    // stream.once('open', function(fd) {
    //   stream.write(jsonData);
    //   stream.end();
    // });
    // api.sendMessage("Remembered! I'll be asking you this soon, so don't forget!", event.thread_id);
