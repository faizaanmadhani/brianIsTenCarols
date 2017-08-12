var request = require('request');
var fs = require('fs');
var i = 0;
var indexes = {};
var weight=0.5;

exports.run = function(api, event) {
  var array = event.body.split(" ");
  //api.sendMessage(array, event.thread_id);
  
  if (typeof array == array){
    //changes weight if weight is given
    weight = max(0, min(1, array[1]));
  }
  if (Math.random() >= weight){
    //something something database goes here
    
  } else {
    
  }
};
