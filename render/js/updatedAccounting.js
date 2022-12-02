includeHTML();

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