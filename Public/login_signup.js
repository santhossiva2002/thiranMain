function handleLogin() {
    const postData = {
        // Add your login data here, for example:
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value
    };

    // Options for the fetch request
    const options = {
        method: 'POST', // Specify the method as POST
        headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify(postData) // Convert data to JSON string and send in the body
    };

    fetch("/login", options) // Pass options as the second parameter
        .then(response => {
            // Check if the response is successful (status code in the range 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            // sessionStorage.setItem("email", )
            alert("success");
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
}

window.onload = function () {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('hashchange', function () {
        window.location.hash = '';
        window.history.pushState(null, '', window.location.href);
    });
};

// Function to validate login form
// Function to validate login form
function validateLoginForm() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    var emailError = document.getElementById("login-email-error");
    var passwordError = document.getElementById("login-password-error");

    // Validate email format
    var emailRegex = /^[0-9]{2}(?!pw|pc|pd|pt)[a-zA-Z]{1,2}[0-9]+@psgtech\.ac\.in$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email address";
        emailError.classList.add("error");
        setTimeout(function() {
            emailError.textContent = "";
        }, 2000);
        return false;
    }

    // Validate password length
    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long";
        passwordError.classList.add("error");
        setTimeout(function() {
            passwordError.textContent = "";
        }, 20000);
        return false;
    }

    return true;
}

// Function to validate signup form
function validateSignupForm() {
    var name = document.getElementById("signup-name").value;
    var email = document.getElementById("signup-email").value;
    var phone = document.getElementById("signup-phone").value;
    var password = document.getElementById("signup-password").value;
    var nameError = document.getElementById("signup-name-error");
    var emailError = document.getElementById("signup-email-error");
    var phoneError = document.getElementById("signup-phone-error");
    var passwordError = document.getElementById("signup-password-error");
    var programme = document.getElementById('programme').value;
    var department = document.getElementById('department').value;
    var year = document.getElementById('year').value;
    var errorMessage = document.getElementById('programme-error-message');

    // Validate name length
    if (name.length < 3) {
        nameError.textContent = "Please enter a valid name (at least 3 characters)";
        nameError.classList.add("error");
        setTimeout(function() {
            nameError.textContent = "";
        }, 2000);
        return false;
    }

    // Validate email format
    // var emailRegex = /^[0-9]{2}[a-zA-Z]{1,2}[0-9]+@psgtech\.ac\.in$/;
    var emailRegex = /^[0-9]{2}(?!pw|pc|pd|pt)[a-zA-Z]{1,2}[0-9]+@psgtech\.ac\.in$/;

    if (!emailRegex.test(email.toLowerCase())) {
        emailError.textContent = "Please enter your correct PSG college email id or department";
        emailError.classList.add("error");
        setTimeout(function() {
            emailError.textContent = "";
        }, 2000);
        return false;
    }

    // Validate phone number format
    var phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        phoneError.textContent = "Please enter a valid 10-digit phone number";
        phoneError.classList.add("error");
        setTimeout(function() {
            phoneError.textContent = "";
        }, 2000);
        return false;
    }

    // Validate password format
    var passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long and contain at least one uppercase letter and one number");
        return false;
    }

    // Validate dropdowns
    if (programme === '' || department === '' || year === '') {
        errorMessage.textContent = 'Please select a value for all dropdowns.';
        errorMessage.classList.add("error");
        setTimeout(function() {
            errorMessage.textContent = '';
            
        }, 2000);
        return false;
    }

    // If all validations pass, return true
    return true;
}


var modal = document.getElementById("myModal");
var closeOTP = document.getElementById("optClose");
var submitOTP = document.getElementById("submitBtn");

closeOTP.onclick = function() {
    modal.style.display = "none";
  }

// Display the OTP modal
function showOTPModal() {
   modal.style.display = "block";
}

submitOTP.onclick = async function() {
    var userOTP  = document.getElementById("otpInput").value;
    var email = document.getElementById("signup-email").value;
    email = email.toLowerCase();

    if (userOTP.trim() === "") {
      alert("Please enter the OTP.");
      return;
    }

    postData = {
        userOTP : userOTP.toString(),
        email: email
    };

    // Options for the fetch request
    options = {
        method: 'POST', // Specify the method as POST
        headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify(postData) // Convert data to JSON string and send in the body
    };

    
        await fetch("/validate_otp", options)
        .then(response => response.json())
        .then(async data => {
            if (data.message === "OTP verified successfully") {
                const name = document.getElementById("signup-name").value;
                const phone = document.getElementById("signup-phone").value;
                const password = document.getElementById("signup-password").value;
                var programme = document.getElementById("programme").value;
                const department = document.getElementById("department").value;
                const year = document.getElementById("year").value;
                switch(programme){
                    case "engineering":
                        programme = "B.E.";
                        break;

                    case "science":
                        programme = "B.Sc.";
                        break;

                    case "master":
                        programme = "M.E.";
                        break;

                    case "postgradscience":
                        programme = "M.Sc.";
                        break;
                }
                postData = {
                    // userOTP : userOTP.toString(),
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    programme: programme,
                    department: department,
                    year: year,
                };
                options = {
                    method: 'POST', // Specify the method as POST
                    headers: {
                        'Content-Type': 'application/json' // Specify content type as JSON
                    },
                    body: JSON.stringify(postData) // Convert data to JSON string and send in the body
                };

                await fetch('/signup', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                 
                    if(data.message === "success"){
                        alert("Registration Successful")
                        modal.style.display = "none";
                        window.location.href = '/login';
                    }
                    else if(data.message === "already"){
                        alert("Registered already")
                        modal.style.display = "none";
                        window.location.href = '/login';
                    }
                    else{
                        alert("Registration is not successful, try again later.")
                        return;
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    // Handle errors here if needed
                    return;
                });
            }
            else {
                alert("Invalid OTP, try to SIGN UP Again");
                return;
            }
            modal.style.display = "none";
            
    })
    .catch(error => {
    console.error('Error:', error);
    alert(error)
    alert('An error occurred while validating OTP. Please try again later.');
    });
  };





async function handleSignUp(){
    if(!validateSignupForm()){
        return;
    }
    
    var email = document.getElementById("signup-email").value;
    email = email.toLowerCase();
    // alert(email)
    

    // Create an object containing the email data
    var postData = {
        email: email
    };

    // Options for the fetch request
    var options = {
        method: 'POST', // Specify the method as POST
        headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify(postData) // Convert data to JSON string and send in the body
    };

    showOTPModal()

    // const userOTP = prompt('Enter the OTP sent to your email:');
    await fetch("/generate_otp", options)
    .then(response => response.json())
    .then(async data => {
        if(data.message === "Already Exists"){
            modal.style.display = "none";
            setTimeout(() => {
                alert("The email is already registered");
                window.location.href = '/login';
            }, 100); 
            
        }
        else if(data.message === "OTP send"){
            
        }
        else{
            alert("Something went Wrong in Sending OTP")
        }

    })
}


// Function to show departments based on selected programme
// JavaScript functions to populate dropdowns remain unchanged
function showDepartments() {
    var programmeSelect = document.getElementById("programme");
    var departmentDiv = document.getElementById("departmentDiv");
    var departmentSelect = document.getElementById("department");
    departmentSelect.innerHTML = "<option value=''>Select Department</option>";

    if (programmeSelect.value === "engineering") {
        departmentDiv.style.display = "block";
        var engineeringDepartments = [
            "Automobile Engineering",
            "Biomedical Engineering",
            "Civil Engineering",
            "Computer Science and Engineering (AI and ML)",
            "Computer Science Engineering",
            "Electrical and Electronics Engineering",
            "Electronics and Communication Engineering",
            "Instrumentation and Control Engineering",
            "Mechanical Engineering",
            "Metallurgical Engineering",
            "Production Engineering",
            "Robotics and Automation",
            "Bio Technology",
            "Fashion Technology",
            "Information Technology",
            "Textile Technology",
            "Electrical and Electronics Engineering Sandwich",
            "Mechanical Engineering Sandwich",
            "Production Engineering Sandwich"
        ];
        engineeringDepartments.forEach(function (department) {
            var option = document.createElement("option");
            option.text = department;
            option.value = department;
            departmentSelect.add(option);
        });
    } else if (programmeSelect.value === "science") {
        // Add departments for Bachelor of Science Programmes
        departmentDiv.style.display = "block";
        var scienceDepartments = [
            "Applied Science",
            "Computer Systems and Design"
            // Add other departments here
        ];
        scienceDepartments.forEach(function (department) {
            var option = document.createElement("option");
            option.text = department;
            option.value = department;
            departmentSelect.add(option);
        });
    } else if (programmeSelect.value === "master") {
        // Add departments for Master of Engineering/Technology Programmes
        departmentDiv.style.display = "block";
        var masterDepartments = [
            "Automotive Engineering",
            "Biometrics and Cybersecurity",
            "Computer Science and Engineering",
            "Control Systems",
            "Embedded & Real-Time Systems",
            "Engineering Design",
            "Industrial Engineering Industrial Metallurgy",
            "Manufacturing Engineering",
            "Power Electronics and Drives",
            "Structural Engineering",
            "VLSI Design",
            "Bio Technology",
            "Nano Science and Technology",
            "Textile Technology"
            // Add other departments here
        ];
        masterDepartments.forEach(function (department) {
            var option = document.createElement("option");
            option.text = department;
            option.value = department;
            departmentSelect.add(option);
        });
    } else if (programmeSelect.value === "postgradscience") {
        departmentDiv.style.display = "block";
        var postgradScienceDepartments = [
            "Applied Mathematics [2 Years]",
            "Fashion Design & Merchandising [5 years integrated]"
        ];
        postgradScienceDepartments.forEach(function (department) {
            var option = document.createElement("option");
            option.text = department;
            option.value = department;
    
            departmentSelect.add(option);
        });
    } else {
        departmentDiv.style.display = "none";
        document.getElementById("yearDiv").style.display = "none";
      }
    }
    
    function showYears() {
        var programmeSelect = document.getElementById("programme");
        var departmentSelect = document.getElementById("department");
        var yearDiv = document.getElementById("yearDiv");
        var yearSelect = document.getElementById("year");
        yearSelect.innerHTML = "<option value=''>Select Year</option>";
    
        if (programmeSelect.value === "engineering" && departmentSelect.value !== "") {
            yearDiv.style.display = "block";
            var selectedDepartment = departmentSelect.value;
            var numberOfYears = selectedDepartment.endsWith("Sandwich") ? 5 : 4;
            addYearOptions(yearSelect, numberOfYears);
        } else if (programmeSelect.value === "science" && departmentSelect.value !== "") {
            yearDiv.style.display = "block";
            var numberOfYears = 3; // All departments for science program are assumed to be 3-year courses
            addYearOptions(yearSelect, numberOfYears);
        } else if (programmeSelect.value === "postgradscience" && departmentSelect.value !== "") {
            yearDiv.style.display = "block";
            var selectedDepartment = departmentSelect.value;
            var numberOfYears = selectedDepartment === "Applied Mathematics [2 Years]" ? 2 : 5;
            addYearOptions(yearSelect, numberOfYears);
        } else if (programmeSelect.value === "master" && departmentSelect.value !== "") {
            yearDiv.style.display = "block";
            var numberOfYears = 2; // All departments for master program are assumed to be 2-year courses
            addYearOptions(yearSelect, numberOfYears);
        } else {
            yearDiv.style.display = "none";
        }
    }
    
    function addYearOptions(yearSelect, numberOfYears) {
        for (var i = 1; i <= numberOfYears; i++) {
            var option = document.createElement("option");
            option.text = "Year " + i;
            option.value = "Year " + i;
            yearSelect.add(option);
        }
    }
    
    
    
    function getYearsForDepartment(department) {
        // Define years based on the department
        var yearMap = {
            "Automobile Engineering": ["First Year", "Second Year", "Third Year"],
            "Biomedical Engineering": ["First Year", "Second Year", "Third Year", "Fourth Year"],

            // Add more departments and their corresponding years as needed
        };
    
        // Return years for the selected department
        return yearMap[department] || [];
    }
    
   
        // JavaScript to toggle password visibility
        const passwordToggle = document.getElementById('password-toggle');
        const signupPasswordToggle = document.getElementById('signup-password-toggle');
        
        // Function to toggle password visibility
        function togglePasswordVisibility(inputField, eyeIcon) {
            const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
            inputField.setAttribute('type', type);
            eyeIcon.classList.toggle('fa-eye-slash');
        }
    
        // Add event listener for password toggle icon in login form
        passwordToggle.addEventListener('click', function() {
            const loginPasswordInput = document.getElementById('login-password');
            togglePasswordVisibility(loginPasswordInput, this);
        });
    
        // Add event listener for password toggle icon in signup form
        signupPasswordToggle.addEventListener('click', function() {
            const signupPasswordInput = document.getElementById('signup-password');
            togglePasswordVisibility(signupPasswordInput, this);
        });
        // Function to handle program change
