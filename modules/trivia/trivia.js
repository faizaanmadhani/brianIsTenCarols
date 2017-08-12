var request = require('request');
var i = 0;
var indexes = {};

exports.run = function(api, event) {
    var array = event.body.split(" ");
    api.sendMessage(array, event.thread_id);
    category = array[1]
    difficulty = array[2]
    var word = array.join(" ");
    request.get('https://opentdb.com/api.php?amount=1&difficulty=' + difficulty, (err, response, body) => {
        body = JSON.parse(body);

        api.sendMessage(body.results[0].question, event.thread_id);
    });
};
