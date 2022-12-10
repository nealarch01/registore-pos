document.addEventListener('DOMContentLoaded', checkLogin);
let currentUser = null;
let font = document.getElementById("fontDropdown");
let fontColor = document.getElementById("fontColor");
let bgColor = document.getElementById("bgColor");

// Function to encode a large string into a series of numbers
function encodeString(str) {
    let encodedString = '';
  
    // Loop through each character in the string
    for (let i = 0; i < str.length; i++) {
      // Add the character's ASCII number to the encoded string
      encodedString += str.charCodeAt(i) + ' ';
    }
  
    return encodedString;
  }
  
async function checkLogin() {
    const login = String(await Backend.getSavedLogin());
    if (login == null || login == "null") {
        // The user must not be logged in, so we re-direct them to log in.
        window.location.assign("./login.html");
        return;
    }
    else {
        //The user is logged in! So, we store the current Employee ID.
        currentUser = (String(login).split(" "))[0]; // This will grab our login ID
        return;
    }
}
function testSettings() {
    if (bgColor.value == "") {
        bgColor.value = "#002837";
    }
    if (font.value == "") {
        font.value = "Arial";
    }
    let myNode = document.getElementById("test");
    myNode.style.fontFamily = font.value;
    myNode.style.color = fontColor.value;
    myNode.style.backgroundColor = bgColor.value;
    console.log(JSON.stringify({ font: font.value, fontColor: fontColor.value, bgColor: bgColor.value }));
}
async function saveSettings() {
    if (bgColor == "") {
        bgColor = "#002837";
    }
    if (font.value == "") {
        font.value = "Arial";
    }

    let jsonString = encodeString(JSON.stringify({ font: font.value, fontColor: fontColor.value, bgColor: bgColor.value }));
    //Once we build our JSON string, then we store it in the database.
    const response = await Backend.updateEmployeeStyling(currentUser, String(jsonString));
    if (response.error !== null) {
        console.log("failed to update employee styling "+ response.error);
        return;
    }
    else if (response.data === null) {
        console.log("Failed to store employee styling ");
        return;
    }
    else
    {
        console.log("Stored employee styling data: "+String(response.data));
    }
}