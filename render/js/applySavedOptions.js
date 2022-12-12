//This file will update the CSS based on a logged in users Saved Options.
document.addEventListener('DOMContentLoaded', checkLogin);
async function checkLogin() {
    let styling = String(await Backend.getSavedStyling());
    if (styling == '""' || isEmpty(styling) || styling == null || styling == "null") {
        // The user must not be logged in, so we use our default CSS options
        return;
    }
    else {
        //The user is logged in! So, we check if they have saved options stored.
        console.log(styling);
        updateCSS(styling);
        return;
    }
}
function isEmpty(str) {
    return (!str || str.length === 0);
}
// Create a function to handle the css updates
function updateModalCSS(bgColor, lighterBGColor, darkerBGColor) {
    document.querySelector('.modalHeader').style.background = darkerBGColor;
    document.querySelector('#modal .eventModal').style.background = bgColor;

    // etc
  }
async function updateCSS(styling) {
    // There is saved employee styling.
    let myStyling = JSON.parse(styling);
    updateFont(myStyling.font);
    updateBGColor(myStyling.bgColor);
    updateFontColor(myStyling.fontColor);
    return;
}
function updateFont(font) {
    document.querySelectorAll('*').forEach(element => {
        element.style.fontFamily = font + ' !important';
    });
}
function updateBGColor(bgColor) {
    document.body.style.backgroundColor = bgColor;
    window.addEventListener("scroll", () => {
        document.body.style.backgroundColor = bgColor;
    });
    document.body.style.background = bgColor;

    document.querySelector('menu').style.background = `radial-gradient(circle at top, ${bgColor}, white)`;
    let darkerBGColor = colorLuminance(bgColor, -0.3);
    let superDarkBGColor = colorLuminance(darkerBGColor, -0.3);
    let lighterBGColor = colorLuminance(bgColor, +0.3);
    //input
    try {
        document.querySelectorAll('button').forEach(function (button) {
            button.style.backgroundColor = darkerBGColor;
            button.style.border = "none";
        });
    } catch { }
    try {
        // set all table rows to be bg color.
        document.addEventListener('scroll', function (event) {
            let rows = document.querySelectorAll('tr');
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.backgroundColor = bgColor;
            }
        });
    } catch { }
    updateRegisterPage(lighterBGColor, bgColor, darkerBGColor, superDarkBGColor);
    updateInventoryPage(lighterBGColor, bgColor, darkerBGColor);

}
function updateFontColor(color) {
    document.querySelector('body').style.color = color;
    try {
        document.querySelectorAll('button').forEach(function (button) {
            button.style.color = color;
        });
        document.querySelectorAll('label').forEach(function (label) {
            label.style.color = color;
        });
    }
    catch { }
}
function updateRegisterPage(lighterBGColor, bgColor, darkerBGColor, superDarkBGColor) {
    try {
        //menuOptionsBar
        document.querySelector("#gallery").style.backgroundColor = darkerBGColor;
        document.querySelector("#menuOptionsBar").style.backgroundColor = bgColor;
        document.getElementById("cart").style.backgroundColor = superDarkBGColor;
        document.getElementById('modal').addEventListener('open', updateModalCSS(bgColor, lighterBGColor, darkerBGColor));
        let observer = new MutationObserver(function () {
            document.querySelectorAll('.itemWrapper, .itemPlusSign, .itemMinusSign').forEach(function (item) {
                item.style.background = bgColor;
                item.addEventListener('mouseover', function () {
                    if (item.classList.contains('itemMinusSign') || item.classList.contains('itemPlusSign')) {
                        item.style.background = darkerBGColor;
                    }

                });
                item.addEventListener('mouseout', function () {
                    item.style.background = bgColor;
                });

            });
            document.querySelectorAll('.cartItemWrapper, .cartItemPlusSign, .cartItemMinusSign').forEach(function (item) {
                item.style.background = superDarkBGColor;
                item.addEventListener('mouseover', function () {
                    if (item.classList.contains('cartItemMinusSign') || item.classList.contains('cartItemPlusSign')) {
                        item.style.background = darkerBGColor;
                    }

                });
                item.addEventListener('mouseout', function () {
                    if (item.classList.contains('cartItemMinusSign') || item.classList.contains('cartItemPlusSign')) {
                        item.style.background = superDarkBGColor;
                    }
                });

            });
            //Change background color
            document.querySelectorAll(".menuBtn").forEach(function (item) {
                item.style.backgroundColor = darkerBGColor;
            });
            //update item titles
            document.querySelectorAll('.itemTitle').forEach((element) => {
                element.style.background = superDarkBGColor;
                element.style.border = `${bgColor} solid 0.2rem`;
            });
            //Mouseover / Mouseout event for our menu
            document.querySelectorAll(".menuBtn").forEach(function (item) {
                item.addEventListener("mouseover", function () {
                    this.style.backgroundColor = lighterBGColor;
                });
                item.addEventListener("mouseout", function () {
                    this.style.backgroundColor = darkerBGColor;
                });
            });

        });
        observer.observe(document.body, { subtree: true, childList: true });

    }
    catch { }
    return;
}
function updateInventoryPage(lighterBGColor, bgColor, darkerBGColor, superDarkBGColor) {
    try {
        document.querySelector('.inventory-center').style.backgroundColor = lighterBGColor;
        let inventoryTable = document.querySelector('#inventory-list');
        document.querySelector('.invBtns').style.backgroundColor = darkerBGColor;
        inventoryTable.addEventListener('mouseover', function (event) {
            let row = event.target.closest('tr');
            if (row) {
                row.style.backgroundColor = darkerBGColor;
            }
        });
        let observer = new MutationObserver(function () {
            document.querySelectorAll('#inventory-list th').forEach(function (th) {
                th.style.backgroundColor = darkerBGColor;
            });
        });
        observer.observe(document.body, { subtree: true, childList: true });
        inventoryTable.addEventListener('mouseout', function (event) {
            let row = event.target.closest('tr');
            if (row) {
                row.style.backgroundColor = bgColor;
            }
        });
        // Get all elements inside the modal
        let modalElements = document.getElementById("addModal").getElementsByTagName("*");
        let modalElements2 = document.getElementById("removeModal").getElementsByTagName("*");

        // Iterate through all elements and set the text color to black
        for (let i = 0; i < modalElements.length; i++) {
            if (modalElements[i].tagName === "INPUT") {
                // Skip this element
                continue;
              }
            modalElements[i].style.color = "black";
        }
        for (let i = 0; i < modalElements2.length; i++) {
            if (modalElements2[i].tagName === "INPUT") {
                // Skip this element
                continue;
              }
            modalElements2[i].style.color = "black";
        }
    }
    catch { }
    return;
}
function colorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    let rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}