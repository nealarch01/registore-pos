

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
    else if(isEmpty(phone) || phone.length < 8 || phone.length >12 ){
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
    const response = await Backend.EmployeeBuilder(fname, lname, phone, email, password,address, city, state, zipcode, hire_date, starting_amount);
    console.log(response); 
}

}

function isEmpty(str) {
    return (!str || str.length === 0 );
}