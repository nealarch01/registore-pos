//This file will update the CSS based on a logged in users Saved Options.
document.addEventListener('DOMContentLoaded', checkLogin);
async function checkLogin() {
    const login = String(await Backend.getSavedLogin());
    if (login == null || login == "null") {
        // The user must not be logged in, so we use our default CSS optios\ns
        return;
    }
    else {
        //The user is logged in! So, we check if they have saved options stored.
        currentUser = (String(login).split(" "))[0]; // This will grab our login ID
        updateCSS(currentUser);
        return;
    }
}
// Function to decode a series of numbers
function decodeString(str) {
    let decodedString = '';
    let numberString = '';

    // Loop through each character in the encoded string
    for (let i = 0; i < str.length; i++) {
        // If the character is a number, add it to the number string
        if (str[i] !== ' ') {
            numberString += str[i];
        }
        // If the character is a space, decode the number string and add it to the decoded string
        else {
            decodedString += String.fromCharCode(Number(numberString));
            numberString = '';
        }
    }

    return decodedString;
}
async function updateCSS(currentUser) {
    //Check if the User has stored styling options.
    const response = await Backend.getEmployee(currentUser);
    if (response.error !== null) {
        console.log("failed to get employee");
        return;
    }
    else if (response.data === null) {
        console.log("Employee does not exist");
        return;
    }
    else if (response.data.styling == "") {
        console.log("No saved styling settings");
        return;
    }
    else {
        // There is saved employee styling.
        let styling = JSON.parse(decodeString(response.data.styling));
        updateFont(styling.font);
        updateBGColor(styling.bgColor);
        updateFontColor(styling.fontColor);
        return;
    }
}
function updateFont(font){
    document.querySelector('body').style.fontFamily = font+ " !important";
}
function updateBGColor(bgColor) {
    document.querySelector('body').style.backgroundColor = bgColor;
    document.querySelector('menu').style.background = `radial-gradient(circle at top, ${bgColor}, white)`;
}
function updateFontColor(color) {
    document.querySelector('body').style.color = color;
}