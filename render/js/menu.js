// get items
var path = window.location.pathname;
var page = path.split("/").pop();
console.log( page );

function addMenu() {
    var elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    menu = document.getElementsByTagName("menuLocation");
    file = menu.getAttribute('menuLocation');
    if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    elmnt.innerHTML = this.responseText;
                }
                if (this.status == 404) {
                    elmnt.innerHTML = "ERROR: Component not found.";
                }
            }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
    }

    /*
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      // search for elements with a certain attribute:
      file = elmnt.getAttribute("mainMenu");
      
    }
    */
  };