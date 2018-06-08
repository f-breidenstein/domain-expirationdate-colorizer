function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function createDatetimeFromString(string) {
  // Original format is "27.09.2018 21:59"
  var arr = string.split(" ");
  var date = arr[0].split(".");
  var time = arr[1].split(":");
  // Date() expects "monthIndex" to start at 0 (January)
  // Therefore we need to substracts 1
  return new Date(date[2], date[1] - 1, date[0], time[0], time[1])
}

var currentDate = new Date();
var okColor = "green";

var warnLimit = 42 * 24 * 60 * 60 * 1000;
var warnColor = "yellow";

var criticalLimit = 14 * 24 * 60 * 60 * 1000;
var criticalColor = "red";


// Get middle table
var middleTable = document.getElementById("tbl_middle_table");

// Get all 'td' from this table
var allTd = middleTable.getElementsByClassName("dl_td");

// filter the 'td' to find the ones representing the expiration dates
var arr = Array.prototype.slice.call(allTd)
arr.forEach(function callback(item) {
  if (endsWith(item.id, "_exDate")) {

    var innerDiv = item.children[0];
    var expDate = createDatetimeFromString(innerDiv.textContent);
    var diff = expDate - currentDate;

    if (diff < criticalLimit) {
      innerDiv.style.color = "white";
      innerDiv.style.backgroundColor = criticalColor;
    } else if (diff < warnLimit) {
      innerDiv.style.backgroundColor = warnColor;
    } else {
      innerDiv.style.backgroundColor = okColor;
      innerDiv.style.color = "white";
    }

  }
});
