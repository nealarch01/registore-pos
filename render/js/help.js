
function displayNothing(){
    console.log("ran")
    let arr = [
        document.getElementById("helpRegister"),
        document.getElementById("helpInventory"),
        document.getElementById("helpAccounting"),
        document.getElementById("helpOptions"),
        document.getElementById("helpLogin")
    ]
    for(i = 0; i < arr.length; i++){
        arr[i].hidden = true;
    }
    return;
}

function showHelpIndex(helpIndex){
    let choosenTab = "help"+helpIndex
    
    //Make an arry to filter out what elements  to display
    let arr = [
        document.getElementById("helpPage"),
        document.getElementById("helpRegister"),
        document.getElementById("helpInventory"),
        document.getElementById("helpAccounting"),
        document.getElementById("helpOptions"),
        document.getElementById("helpLogin")
    ]
    //Use this to see which tab was clicked
    let x = document.getElementsByClassName("activeNav");
    //Hide Elements
    for(i = 0; i < arr.length; i++){
        arr[i].hidden = true;
    }
    //Display Elements
    for(i = 0; i < arr.length; i++){
        if(arr[i].id  === choosenTab){
            arr[i].hidden = false;
        }
    }
    return;
}

