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

async function setLogin(login, styling){
  await Backend.setSavedLogin(login);   
  await Backend.setSavedStyling(styling);
}

async function logout(){
  await Backend.logout();
  // Refresh page upon logout
  window.location.assign("./login.html");
}


async function login(){
    let username = document.getElementById("employeeid").value;
    const response = await Backend.getEmployee(username);
    if (response.error !== null) {
        /*TODO: update error messages*/
        console.log(response.error);
        await Backend.showDialog("LOGIN ERROR "+ response.error);

        return;
    }
    if (response.data === null) {
        await Backend.showDialog("USER CREDENTIALS INVALID. ");
        return;
    }
    let employee = response.data;
    let password = document.getElementById("password").value;
    if(employee.password == password)
    {
      console.log("match");
      setLogin(String(employee.id + " " + employee.password), employee.styling); 
      console.log("Login Valid");
      location.reload(true);
    }
    else
    {
      await Backend.showDialog("USER CREDENTIALS INVALID. ");
    }
  
}