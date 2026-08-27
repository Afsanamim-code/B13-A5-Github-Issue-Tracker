// 1. Get the elements from HTML
const loginForm = 
document.getElementById("loginForm");
const usernameInput =
document.getElementById("usernameInput");
const passwordInput = 
document.getElementById("passwordInput");
const usernameError = 
document.getElementById("usernameError");
const passwordError =
document.getElementById("passwordError");


// 2. Demo login information
const correctUsername = "admin";
const correctPassword = "admin123";


// Get password toggle button
const passwordToggle = document.querySelector("#passwordInput + button");
// Get eye icon
const passwordIcon = passwordToggle.querySelector("i");


// 3. Password show / hide
passwordToggle.addEventListener("click", function () {

    if(passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.remove("fa-eye");
        passwordIcon.classList.add("fa-eye-slash");

    } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove("fa-eye-slash");
        passwordIcon.classList.add("fa-eye");
    }

});




// 3. Listen for form submission
loginForm.addEventListener("submit", function(event) {


    // Stop the browser from refreshing the page
    event.preventDefault();

    // Get what the user typed
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();


    // Check empty inputs
    let isValid = true;

    
    if(username === "") {
        usernameError.classList.remove("hidden");
        usernameInput.classList.add("border-red-500");
        isValid = false;
    } else {
        usernameError.classList.add("hidden");
        usernameInput.classList.remove("border-red-500");
    }


    if(password === "") {
        passwordError.classList.remove("hidden");
        passwordInput.classList.add("border-red-500");
        isValid = false;
    } else {
        passwordError.classList.add("hidden");
        passwordInput.classList.remove("border-red-500");
    }

    // Stop here if an input is empty
    if(!isValid) {
        return;
    }

    // 5. Check username and password
    const usernameIsCorrect = username === correctUsername;
    const passwordIsCorrect = password === correctPassword;

    if(usernameIsCorrect && passwordIsCorrect) {


        //Login Successful
        alert("Login successful!");

        // Redirect to the home page after a successful login
        window.location.href = "home.html";


    } else {

        // Login failed
        alert("Invalid username or password");
    }

});