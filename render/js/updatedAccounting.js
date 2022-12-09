

//updated displaytable function, just pass JSON returned from backend
function displayTable(myList) {
  //console.log(myList);
  var rows = "";
  addColumnHeaders(myList);
  for (var i = 0; i < myList.data.length; i++) {
    rows += "<tr>";

    for (var key in myList.data[i]){
        rows += "<td>" + myList.data[i][key] + "</td>";
    }

      rows += "</tr>";
  }
  var table = document.getElementById("datatable");
  table.innerHTML += rows;
  console.log(rows);
}

//generates column headers based off the keys from the first object in the list
function addColumnHeaders(myList){
  var rows = "<tr>";
      var rowHash = myList.data[0];
      for (var key in rowHash){
          rows +=  "<th>" + key + "</th>";
      }
  rows += "</tr>";
  console.log(rows);
  var table = document.getElementById("datatable");
  table.innerHTML += rows;
}

function todayTable(){
  var today = new Date();
  var startOfDay = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0);
  console.log("today: "+today);
  console.log("startOfDay: "+startOfDay);
  customDateTable(today, startOfDay);
}

//need to fix for weeks that span 2 months
function thisWeekTable(){
  var today = new Date();
  var startOfWeek = new Date(today.getFullYear(),today.getMonth(),(today.getDate()-today.getDay()),0,0,0);
  customDateTable(today, startOfWeek);
}

function thisMonthTable(){
  var today = new Date();
  var startOfMonth = new Date(today.getFullYear(),today.getMonth(),1,0,0,0);
  customDateTable(today, startOfMonth);
}


//generates a table containing all transactions from first of year until today.
async function YTDTable(){
  var today = new Date(); //= get todays date
  var firstDayOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0);//= get first day of today's year
  console.log("today: "+today);
  console.log("firstDayOfYear: "+firstDayOfYear);
  customDateTable(today, firstDayOfYear);
}

//generates table of all transactions within two given dates
async function customDateTable(date1, date2){
  //CHECK IF VALID DATE RANGE
  if(date1 <= date2){
    var inCorrectDate = " <caption>Please input correct date range</caption>";
    var table = document.getElementById("datatable");
    table.innerHTML = inCorrectDate;
  return;}
  
  var displayDate1 = date1.getFullYear() + "-"+ (date1.getMonth()+1) + "-" + date1.getDate();
  var displayDate2 = date2.getFullYear() + "-"+ (date2.getMonth()+1) + "-" + date2.getDate();
  var rows = " <caption>Data from " + displayDate1 + " through " + displayDate2 + ".</caption>";
  var table = document.getElementById("datatable");
  table.innerHTML = rows;
  //WORK IN PROGRESS CODE GOES BELOW HERE

  //1.pull data from backend with dates
  let transactionData = await Backend.getTransactionsBetweenDates(date2, date1);
  
  //2.build table
  displayTable(transactionData);

  
}


//displays options for user to input a custom date range.
function displayCustomDate(){
  document.getElementById("customDate").classList.toggle("show");
}


//display Dropdown menus for custom date
function showYear1(){document.getElementById("yearOne").classList.toggle("show"); insertYears(1);}
function showMonth1(){document.getElementById("monthOne").classList.toggle("show");}
function showDay1(){document.getElementById("dayOne").classList.toggle("show");}
function showYear2(){document.getElementById("yearTwo").classList.toggle("show"); insertYears(2)}
function showMonth2(){document.getElementById("monthTwo").classList.toggle("show");}
function showDay2(){document.getElementById("dayTwo").classList.toggle("show");}


function insertYears(oneOrTwo){
  var yearList = "";
  //Change to update to current year
  for (var i = 22; i > 0; i--){
    if(i>9){
      //yearList += "<option value=20"+i+">20"+i+"</option>";
      yearList += "<div onclick=\"changeResultYear(20"+i+", "+ oneOrTwo +")\">20"+i+"</div>";
    }
    else{
      //yearList += "<option value=200"+i+">200"+i+"</option>";
      yearList += "<div onclick=\"changeResultYear(200"+i+", "+ oneOrTwo +")\">200"+i+"</div>";
    }
  }

  var whichYearDropdown;
  if(oneOrTwo == 1){
    whichYearDropdown = document.getElementById("yearOne");
  }
  if(oneOrTwo == 2){
    whichYearDropdown = document.getElementById("yearTwo");
  }
  whichYearDropdown.innerHTML = yearList;

}

//changes the text displayed on the year button to the selected year
function changeResultYear(year, oneOrTwo) {
//var year = document.getElementById("yearOne").value;
  if (oneOrTwo == 1){
    document.getElementById("yearOneButtonText").innerHTML = year;
  }
  if (oneOrTwo == 2){
    document.getElementById("yearTwoButtonText").innerHTML = year;
  }

}


//changes the text displayed on the month button to the selected year
function changeResultMonth(month, oneOrTwo) {
switch(oneOrTwo){
    case 1:
      switch(month){
        case 1:
          document.getElementById("monthOneButtonText").innerHTML = "January";
          break;
        case 2:
          document.getElementById("monthOneButtonText").innerHTML = "February";
          break;
        case 3:
          document.getElementById("monthOneButtonText").innerHTML = "March";
          break;
        case 4:
          document.getElementById("monthOneButtonText").innerHTML = "April";
          break;
        case 5:
          document.getElementById("monthOneButtonText").innerHTML = "May";
          break;
        case 6:
          document.getElementById("monthOneButtonText").innerHTML = "June";
          break;
        case 7:
          document.getElementById("monthOneButtonText").innerHTML = "July";
          break;
        case 8:
          document.getElementById("monthOneButtonText").innerHTML = "August";
          break;
        case 9:
          document.getElementById("monthOneButtonText").innerHTML = "September";
          break;
        case 10:
          document.getElementById("monthOneButtonText").innerHTML = "October";
          break;
        case 11:
          document.getElementById("monthOneButtonText").innerHTML = "November";
          break;
        case 12:
          document.getElementById("monthOneButtonText").innerHTML = "December";
          break;
      }
      break;
    case 2:
      switch(month){
        case 1:
          document.getElementById("monthTwoButtonText").innerHTML = "January";
          break;
        case 2:
          document.getElementById("monthTwoButtonText").innerHTML = "February";
          break;
        case 3:
          document.getElementById("monthTwoButtonText").innerHTML = "March";
          break;
        case 4:
          document.getElementById("monthTwoButtonText").innerHTML = "April";
          break;
        case 5:
          document.getElementById("monthTwoButtonText").innerHTML = "May";
          break;
        case 6:
          document.getElementById("monthTwoButtonText").innerHTML = "June";
          break;
        case 7:
          document.getElementById("monthTwoButtonText").innerHTML = "July";
          break;
        case 8:
          document.getElementById("monthTwoButtonText").innerHTML = "August";
          break;
        case 9:
          document.getElementById("monthTwoButtonText").innerHTML = "September";
          break;
        case 10:
          document.getElementById("monthTwoButtonText").innerHTML = "October";
          break;
        case 11:
          document.getElementById("monthTwoButtonText").innerHTML = "November";
          break;
        case 12:
          document.getElementById("monthTwoButtonText").innerHTML = "December";
          break;
    }
    break;

  }
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//changes the text displayed on the day button to the selected day
function changeResultDay(day, oneOrTwo) {
  if(oneOrTwo ==1){
    document.getElementById("dayOneButtonText").innerHTML = day;

  }
  else if(oneOrTwo ==2){
    document.getElementById("dayTwoButtonText").innerHTML = day;
  }
}


//Executes the custom report once the date fields have been filled
function executeCustomDates(){
  var monthNumberOne = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ].indexOf(document.getElementById("monthOneButtonText").innerHTML);

  var firstDate = new Date(document.getElementById("yearOneButtonText").innerHTML, monthNumberOne, document.getElementById("dayOneButtonText").innerHTML, 0, 0, 0);
  console.log(firstDate)


  var monthNumberTwo = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ].indexOf(document.getElementById("monthTwoButtonText").innerHTML);

  var secondDate = new Date(document.getElementById("yearTwoButtonText").innerHTML, monthNumberTwo, document.getElementById("dayTwoButtonText").innerHTML, 0, 0, 0);
  console.log(secondDate)

  customDateTable(firstDate, secondDate);

}