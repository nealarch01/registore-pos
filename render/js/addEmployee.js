
// Reads the new employee form, and adds the new employee to our DB.
async function readForm(){
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let phone = document.getElementById("phone_number").value;
    let email = document.getElementById("email").value; 
    let password= document.getElementById("password").value; 
    let address= document.getElementById("address").value; 
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zipcode = document.getElementById("zipcode").value;
    let hire_date = document.getElementById("date").value;
    let starting_amount = document.getElementById("starting_amount").value;

    if(isEmpty(fname)){
        alert("Missing First name"); 
    }
    else if(isEmpty(lname)){
        alert("Missing Last name"); 
    }
    else if(isEmpty(phone) || phone.length < 8 || phone.length >15 || !hasNumber(phone)){
        alert("Invalid phone number"); 
    }
    else if(isEmpty(email)){
        alert("Missing Email"); 
    }
    else if(isEmpty(password)){
        alert("Please enter password");
    }
    else if (isEmpty(address)){
        alert("Invalid address");
    }
    else if(isEmpty(city)){
        alert("Missing City"); 
    }
    else if(isEmpty(state)){
        alert("Missing State"); 
    }
    else if( zipcode==null || String(zipcode).length < 5 ){
        alert("Invalid Zipcode"); 
    }
    else if(isEmpty(hire_date)){
        alert("Missing Hire date"); 
    }
    else if(starting_amount==null || starting_amount < 0){
        alert("Invalid starting amount"); 
   }
   else{
       // Create an Employee Object
    const newEmployee = await Backend.EmployeeBuilder(fname, lname, phone, email, password,address, city, state, zipcode, hire_date, starting_amount);
    //Check if the employee created is not valid.
    if (newEmployee.error !== null) {
        console.log("ERROR" + newEmployee.error);
        return;
    }
    else // If the employee created is valid
    {
        console.log("Employee Added");
        //Now that we have a new employee, we need to update our screen to show that we have added them.
        clearAddEmployeeForm(fname, newEmployee.data);
    }
}

}
function clearAddEmployeeForm(name, id)
{
    let addEmployeeForm = document.getElementById("addEmployee");
    addEmployeeForm.innerHTML = `<h3>Added new Employee ${name} with an ID of ${id}</h3><br>
                                <button onclick="reset()">Add Another Employee</button>`;
}
function reset()
{
    //This function just refreshes the page.
    window.location.assign("./addEmployee.html");
}
// check if our string input is empty.
function isEmpty(str) {
    return (!str || str.length === 0 );
}
//Check if our string input contains a number.
function hasNumber(myString) {
    return /\d/.test(myString);
  }