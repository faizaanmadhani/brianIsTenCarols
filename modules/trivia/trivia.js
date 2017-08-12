var request = require('request');
var fs = require('fs');
function get_type(S){
	if (S.toLowerCase() === "any category") return "";
  var types = ["", "", "", "", "", "", "", "", "", "General Knowledge", "Books", "Film", "Music", "Musicals & Theatres", "Television", "Video Games", "Board Games", "Science & Nature", "Computers", "Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Comics", "Gadgets", "Japanese Anime & Manga", "Cartoon & Animations"];
	for (var l = 0; l < 33; ++l){
		if (S.toLowerCase() == types[l].toLowerCase()){
			return l;
		}
	}
  return "";
}
exports.run = function(api, event) {
    var array = event.body.split(" ");
    var category = array[1]
    var difficulty = array[2]
    var word = array.join(" ");

    difficulty = difficulty.toLowerCase();
    if (difficulty != "hard" && difficulty != "medium" && difficulty != "easy"){
      difficulty = "";
    }

    request.get('https://opentdb.com/api.php?amount=1&category=' + get_type(category) + '&difficulty=' + difficulty, (err, response, body) => {
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
};
