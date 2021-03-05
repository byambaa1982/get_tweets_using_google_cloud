function seatch_word() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var x = sheet.getRange(2,1);  
  data = {"key_word": x.getValue()};
 
  
  // TODO: Add your URL below
  var URL = "https://us-central1-twittersheet-275317.cloudfunctions.net/get-tweet-by-search"
  
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };
  var result = UrlFetchApp.fetch(URL, options);
  var params = JSON.parse(result.getContentText());
  var tweet_link='https://twitter.com/twitter/statuses/';  
    Logger.log(data)
    Logger.log(options.payload)
    Logger.log(options)
    Logger.log(params[0][0])
    Logger.log(tweet_link+(params[0][0]).toString())
    return params;
}
// ------------- New Function start here ------------------
function get_followers_data(){
  // var sheet = SpreadsheetApp.getActiveSheet();
  var sheet = SpreadsheetApp.getActive().getSheetByName('get_followers_data')
  var x = sheet.getRange(2,1);  
  data = {"key_word": x.getValue()};
 
  
  // TODO: Add your URL below
  var URL = "https://us-central1-twittersheet-275317.cloudfunctions.net/get-twitter-followers"
  
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };
  var result = UrlFetchApp.fetch(URL, options);
  var params = JSON.parse(result.getContentText()); 
    Logger.log(data)
    Logger.log(options.payload)
    Logger.log(options)
    Logger.log(params[0][0])
    return params;
}
//---------------------------------------------------------
//-------------- New Function 
function get_tweets_data(){
  // var sheet = SpreadsheetApp.getActiveSheet();
  var sheet = SpreadsheetApp.getActive().getSheetByName('get_tweets_by_user_and_keyword')
  var x = sheet.getRange(2,1);
  var y=sheet.getRange(2,2)  
  data = {"target": x.getValue(),"keyword":x.getValue()};
 
  
  // TODO: Add your URL below
  var URL = "https://us-central1-twittersheet-275317.cloudfunctions.net/get-tweet-by-username"
  
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };
  var result = UrlFetchApp.fetch(URL, options);
  var params = JSON.parse(result.getContentText()); 
    Logger.log(data)
    Logger.log(options.payload)
    Logger.log(options)
    Logger.log(params[0][0])
    return params;
}

//----------
function Print() {
var data=seatch_word();
Logger.log(data.length);
Logger.log(data[0][1]);
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();
 for (var i=0; i < data.length; i++) { // going through all the rows
    for (var j=0; j < data[i].length; j++) { // this is going through all the cell of a row
        Logger.log('found it');
        var row = Number(i)+4;
        var col = Number(j)+1;
        sheet.getRange(row, col).setValue(data[i][j]);
    }  
  }
}
function Print2() {
var data=get_followers_data();
Logger.log(data.length);
Logger.log(data[0][1]);
var sheet = SpreadsheetApp.getActive().getSheetByName('get_followers_data');
 for (var i=0; i < data.length; i++) { // going through all the rows
    for (var j=0; j < data[i].length; j++) { // this is going through all the cell of a row
        Logger.log('found it');
        var row = Number(i)+4;
        var col = Number(j)+1;
        sheet.getRange(row, col).setValue(data[i][j]);
    }  
  }
}
function Print3() {
var data=get_tweets_data();
Logger.log(data.length);
Logger.log(data[0][1]);
var sheet = SpreadsheetApp.getActive().getSheetByName('get_tweets_by_user_and_keyword');
 for (var i=0; i < data.length; i++) { // going through all the rows
    for (var j=0; j < data[i].length; j++) { // this is going through all the cell of a row
        Logger.log('found it');
        var row = Number(i)+4;
        var col = Number(j)+1;
        sheet.getRange(row, col).setValue(data[i][j]);
    }  
  }
}
function onOpen() {
   var menu = [{name: "Get tweets", functionName: "Print"},{name: "Get followers", functionName: "Print2"},
   {name: "get_tweets_data", functionName: "Print3"} ];
   SpreadsheetApp.getActiveSpreadsheet().addMenu("Custom", menu);  
}