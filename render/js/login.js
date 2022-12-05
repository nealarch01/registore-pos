var user_input= ""; 
document.addEventListener('DOMContentLoaded', readCookie);
let currentSession= null; 

async function readCookie(){
  const response = await Backend.getCookie();
    if (response === null) {
        /*TODO: update error messages*/
        return;
    }
    else{
    console.log("BLABLABALB");
    console.log(response);
    }
  
}

async function setCookie(employeeId){
  const response = await Backend.setCookie(employeeId);
    if (response.error !== null) {
        /*TODO: update error messages*/
        console.log(response.error);
        return;
    }
    if (response.data === null) {
        /*TODO: update error messages*/

        return;
    }
    
}

async function clearCookie(){
  await Backend.clearCookie();
    
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

async function check_id(){
    /*fs.readFile('./text.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
    console.log(window.api.fs)
    window.location.assign("./inventory.html")*/
    console.log(user_input);
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
    employees.forEach((employee) => {
      if(employee.id== user_input){
        console.log("match");
        window.location.assign("./inventory.html"); 
        match=true; 
        setCookie(employee.id); 
        return;
      }
      
    });
    if(!match){
    console.log("not match");
    alert("ID IS INCORRECT");
    }
  
}