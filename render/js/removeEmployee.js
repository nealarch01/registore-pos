

async function matchID(){
/*
    const response = await Backend.getAllEmployees();
    if (response.error !== null) {
        /*TODO: update error messages
        console.log(response.error);

        return;
    }
    if (response.data === null) {
        /*TODO: update error messages

        return;
    }

    let employees = response.data;
    let id=document.getElementById("id").value;
    let  fname= document.getElementById("fname").value; 
    let lname=document.getElementById("lname").value; 

  employees.forEach((employee) => {
    console.log("Current DB: "+employee.id + " "+ employee.first_name + " "+ employee.last_name);
    if( employee.id ==id && employee.fname == fname && employee.lname ==lname){
        console.log("match"); 
        match=true; 
        }
    });   
    removeEmployee(id); 
  if(!match){
      console.log("not match");
      alert("USER CREDENTIALS INVALID. PLEASE TRY AGAIN!"); 
  }
}*/
}


async function removeEmployee(matchingID){
    let id=document.getElementById("id").value;
    //save the input as object
    const removeEmployee = await Backend.deleteEmployee(Number(id));

    //check if the employee is deleted
    if (removeEmployee.error !== null) {
        console.log("ERROR" + removeEmployee.error);
        return;
    }
    else // If the employee is deleted
    {
     console.log("Employee Removed");
        clearAddEmployeeForm(fname, removeEmployee.data);
 }
}