var request = require('request');
var i = 0;
var indexes = {};
function get_type(S){
	if (S.toLowerCase() === "any category") return "";
  var types = ["", "", "", "", "", "", "", "", "", "General Knowledge", "EBooks", "Film", "Music", "Musicals & Theatres", "Television", "Video Games", "Board Games", "Science & Nature", "Computers", "Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Comics", "Gadgets", "Japanese Anime & Manga", "Cartoon & Animations"];
	for (var l = 0; l < 33; ++l){
		if (S.toLowerCase() == types[l].toLowerCase()){
			return l;
		}
	}
  return "";
}
exports.run = function(api, event) {
    var array = event.body.split(" ");
    api.sendMessage(array, event.thread_id);
    var category = array[1]
    var difficulty = array[2]
    var word = array.join(" ");
    
    difficulty = difficulty.toLowerCase();
    if (difficulty != "hard" && difficulty != "medium" && difficulty != "easy"){
      difficulty = "";
    }
  
    request.get('https://opentdb.com/api.php?amount=1&category=' + get_type(category) + '&difficulty=' + difficulty, (err, response, body) => {
        body = JSON.parse(body);

        api.sendMessage(body.results[0].question, event.thread_id);
    });
};
