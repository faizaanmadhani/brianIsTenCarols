var reddit = require('./../common/reddit.js');
var response="";
exports.match = function(text) {
    if(/r\//.test(text)){
        var match = /r\/([^\s]+)/i.exec(text);
        response= match[1];
        return true;
    }

};

exports.run = function(api, event) {
    let sub = response;
    api.sendTyping(event.thread_id);
    reddit.reddit(sub, 100, function(err, data){
         if (!err && data.length > 1){
            var index= Math.floor(Math.random() * data.length);
            var title = data[index].data.title,
                text = data[index].data.selftext,
                url = data[index].data.url;
            if (url != null){
                api.sendImage("url", url, title, event.thread_id);
            }   else{
                api.sendMessage(title, event.thread_id);
                api.sendMessage(text, event.thread_id);
            }
        }
        else{
             api.sendMessage("What the hell there's not a subreddit yet. You should make one.", event.thread_id)
        }
    });
};
