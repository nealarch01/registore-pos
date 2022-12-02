includeHTML();//this was here when i got here, dont know what it does -Jesse
//TEST DATA 
var myList = [
    { "id": "1", "date": "11/28/2022", "salesperson_id": 5, "total": "50.55", "discount": "", "final_total": "50.55", "payment_type": "cash"},
    { "id": "2", "date": "11/28/2022", "salesperson_id": 4, "total": "40.22", "discount": "", "final_total": "40.22", "payment_type": "cash"},
    { "id": "3", "date": "11/28/2022", "salesperson_id": 7, "total": "35.99", "discount": "", "final_total": "35.99", "payment_type": "cash"}
  ];
//END TEST DATA 

function displayTable(timelength) {
    //load transactions from dates going back timelength
    var rows = " <caption>Data from last " + timelength + " days</caption>";
    addColumnHeaders(myList);


    //will need to fix for loop to adhere to # of days requested
    for (var i = 0; i < myList.length; i++) {
        rows += "<tr>";


        //UPDATE THIS WHEN WE KNOW FINAL KEYS VVVVVV
        //rows += "<td>" + myList[i].id + "</td>" + "<td>" + myList[i].date + "</td>" + "<td>" + myList[i].salesperson_id + "</td>"
        //+ "<td>" + myList[i].total + "</td>" + "<td>" + myList[i].discount + "</td>" + "<td>" + myList[i].final_total + "</td>" + "<td>" + myList[i].payment_type + "</td>";
        

        //this should be better, wont need updating if data keys change
        for (var key in myList[i]){
            rows += "<td>" + myList[i][key] + "</td>";
        }


        rows += "</tr>";
    }
    var table = document.getElementById("datatable");
    table.innerHTML += rows;
    console.log(rows);
}

function addColumnHeaders(myList){
    
    var rows = "<tr>";
    var rowHash = myList[0];
    for (var key in rowHash){
        rows +=  "<th>" + key + "</th>";
    }
    rows += "</tr>";

    var table = document.getElementById("datatable");
    table.innerHTML = rows;
}

//generates a table containing all transactions from first of year until today.
//WORK IN PROGRESS
function YTDTable(){
    var today; //= get todays date
    var firstDayOfYear; //= get first day of today's year
    customDateTable(today, firstDayOfYear);
}
  
  //generates table of all transactions within two given dates
function customDateTable(date1, date2){
    //CHECK IF VALID DATE RANGE
    if(date1 <= date2){
    var inCorrectDate = " <caption>Please input correct date range</caption>";
    var table = document.getElementById("datatable");
    table.innerHTML = inCorrectDate;
    return;}
    //WORK IN PROGRESS CODE GOES BELOW HERE
  
  
  
}
  
  //displays options for user to input a custom date range.
  //FINISHED
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
  
  //fills years into custom date dropdown
function insertYears(oneOrTwo){
    var yearList = "";
  
    //Change to update to current year
    for (var i = 22; i > 0; i--){
      if(i>9){
        yearList += "<option value=20"+i+">20"+i+"</option>";
      }
      else{
        yearList += "<option value=200"+i+">200"+i+"</option>";
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