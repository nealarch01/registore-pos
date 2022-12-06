document.addEventListener('DOMContentLoaded', getSavedLogin);
let loginSystem = document.getElementById("loginSystem");
async function getSavedLogin(){
  const login = String(await Backend.getSavedLogin());
    if (login == null || login=="null") {
        console.log('there is no saved login');
        return;
    }
    else{
      //Let's verify login
      console.log('there is a saved login' + String(login));
      let myUser = String(login).split(" ");
      loginSystem.innerHTML = `<h3>Welcome back Employee ${myUser[0]} </h3><br>` +
                              `<button onclick="logout()">logout</button>`;
      return;
    }
  
}

async function setLogin(login){
  await Backend.setSavedLogin(login);   
}

async function logout(){
  await Backend.logout();
  // Refresh page upon logout
  window.location.assign("./login.html");
}

async function display(event){
    console.log(event.target.value) 
    user_input+= event.target.value
    document.querySelector(".login_display").textContent=user_input 
}

async function delete_value(){ 
    user_input= user_input.slice(0,-1) 
    document.querySelector(".login_display").textContent=user_input 

}

async function login(){
    /*fs.readFile('./text.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
    console.log(window.api.fs)
    window.location.assign("./inventory.html")*/
    
    const response = await Backend.getAllEmployees();
    if (response.error !== null) {
        /*TODO: update error messages*/
        console.log(response.error);

        return;
    }
    if (response.data === null) {
        /*TODO: update error messages*/

        return;
    }
    let employees = response.data;
    let match = false; 
    let username = document.getElementById("employeeid").value;
    let password = document.getElementById("password").value;
    employees.forEach((employee) => {
      console.log("Current DB: "+employee.id + " "+ employee.password);
      if(employee.id== username && employee.password == password){
        console.log("match");
        window.location.assign("./inventory.html"); 
        match=true; 
        setLogin(String(employee.id + " " + employee.password)); 
        console.log("Login Valid");
        return;
      }
      
    });
    if(!match){
    console.log("not match");
    alert("USER CREDENTIALS INVALID. ");
    }
  
}