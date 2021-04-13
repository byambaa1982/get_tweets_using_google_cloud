function clearSheet(){
  //colNumber is the numeric value of the colum
  //startRow is the number of the starting row
  var sheet = SpreadsheetApp.getActive().getSheetByName('get_tweets_by_user_and_keyword');
  var mysheet=sheet;
  var colNumber=1;
  var startRow=4;
  var colsGet=8;
  var sheet = mysheet;
  var numRows = sheet.getLastRow() - startRow + 1; // The number of row to clear
  var range = sheet.getRange(startRow, colNumber, numRows, colsGet,);
  range.clear();
}

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
  var y= sheet.getRange(2,2)  
  data = {"target": x.getValue(),"keyword":y.getValue()};
 
  
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
function get_tweets_data(row){
  // var sheet = SpreadsheetApp.getActiveSheet();
  var sheet = SpreadsheetApp.getActive().getSheetByName('get_followers_data')
  var lastRow = row;
  // var x = sheet.getRange(4,1,1,lastRow).getValues();
  // var targets=x.filter(String);
  var y=sheet.getRange(2,2)
  var targets=[];
  for (i = lastRow-100; i < lastRow; i++) {
  targets.push(sheet.getRange(i,2).getValue());
  }  
  data = {"target": targets,"keyword":y.getValue()};
  Logger.log(targets)
  Logger.log(y.getValue())
  
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
var sheet = SpreadsheetApp.getActive().getSheetByName('Get_tweets_with_keyword');
var mysheet=sheet;
var colNumber=1;
var startRow=4;
var colsGet=8;
clearColumn(mysheet,colNumber, startRow,colsGet);
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
var mysheet=sheet;
var colNumber=1;
var startRow=4;
var colsGet=2;
clearColumn(mysheet, colNumber, startRow, colsGet);
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
var sheetFollowers = SpreadsheetApp.getActive().getSheetByName('get_followers_data')
var lastOne=sheetFollowers.getLastRow()+1
  for (var row=104; row < 500; row=row+100){
    Logger.log(row)
    var data=get_tweets_data(row);
    Logger.log(data[0][1]);
    Logger.log(data.length);
    var sheet = SpreadsheetApp.getActive().getSheetByName('get_tweets_by_user_and_keyword');
    var lastRow=sheet.getLastRow()+1;
    for (var i=0; i < data.length; i++) { // going through all the rows
        for (var j=0; j < data[i].length; j++) { // this is going through all the cell of a row
            // Logger.log('found it');
            var row = Number(i)+lastRow;
            var col = Number(j)+1;
            if (data[i][j] === "No_tweets_found") { continue; }
            sheet.getRange(row, col).setValue(data[i][j]);
      }  
    }
  }
}
function deleteBlankRows() {
  
  var SS = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get sheets
  var sheets = SS.getSheets();
  
  // Loop through sheets. Delete blank rows in each sheet.
  for (var s=0; s < sheets.length; s++) {
    var currentSheet = sheets[s];
    var sheetName = sheets[s].getName();
    var searchDataRange = currentSheet.getRange(1,1,currentSheet.getMaxRows(),currentSheet.getMaxColumns()); // get the ENTIRE sheet. not just where the data is.
    var searchValues = searchDataRange.getValues();
    var numRows = searchValues.length;
    var numCols = searchDataRange.getNumColumns();
    var rowsToDel = [];
    var delRow = -1;
    var prevDelRow = -2;
    var rowClear = false;
    
    // Loop through Rows in this sheet
    for (var r=0; r < numRows; r++) {
      
      // Loop through columns in this row
      for (var c=0; c < numCols; c++) {
        if (searchValues[r][c].toString().trim() === "") {
          rowClear = true;
        } else {
          rowClear = false;
          break;
        }
      }
      
      // If row is clear, add it to rowsToDel
      if (rowClear) {
        if (prevDelRow === r-1) {
          rowsToDel[delRow][1] = parseInt(rowsToDel[delRow][1]) + 1;
        } else {
          rowsToDel.push([[r+1],[1]]);
          delRow += 1;
        }
        prevDelRow = r;
      }
    }
    
    
    Logger.log("numRows: " + numRows);
    Logger.log("rowsToDel.length: " + rowsToDel.length);
    
    // Delete blank rows in this sheet, if we have rows to delete.
    if (rowsToDel.length>0) {
      // We need to make sure we don't delete all rows in the sheet. Sheets must have at least one row.
      if (numRows === rowsToDel[0][1]) {
        // This means the number of rows in the sheet (numRows) equals the number of rows to be deleted in the first set of rows to delete (rowsToDel[0][1]).
        // Delete all but the first row.
        if (numRows > 1) {
          currentSheet.deleteRows(2,numRows-1);
        }
      } else {
        // Go through each set of rows to delete them.
        var rowsToDeleteLen = rowsToDel.length;  
        for (var rowDel = rowsToDeleteLen-1; rowDel >= 0; rowDel--) {
          currentSheet.deleteRows(rowsToDel[rowDel][0],rowsToDel[rowDel][1]);
        }
      }
    }
  }
}
function onOpen() {
   var menu = [{name: "Get tweets", functionName: "Print"},{name: "Get followers", functionName: "Print2"},
   {name: "get_tweets_data", functionName: "Print3"} ,{name:"Clear Sheet", functionName:"clearSheet"}, {name: "Remove empty rows", functionName: "removeEmptyRows"}];
   SpreadsheetApp.getActiveSpreadsheet().addMenu("Custom", menu);  
}

