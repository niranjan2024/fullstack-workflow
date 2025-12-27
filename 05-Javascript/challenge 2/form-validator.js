const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registerForm");

const userError = document.getElementById("userError");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");
const confirmError = document.getElementById("confirmError");

let validUser = false;
let validEmail = false;
let validPass = false;
let validConfirm = false;

username.addEventListener("blur", function () {
    const regex = /^[a-zA-Z0-9]{3,15}$/;

    if (regex.test(username.value)) {
        userError.textContent = "✓ Valid username";
        userError.className = "success";
        validUser = true;
    } else {
        userError.textContent = "Username must be 3–15 alphanumeric characters";
        userError.className = "error";
        validUser = false;
    }
    checkForm();
});

email.addEventListener("blur", function () {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email.value)) {
        emailError.textContent = "✓ Valid email";
        emailError.className = "success";
        validEmail = true;
    } else {
        emailError.textContent = "Enter a valid email address";
        emailError.className = "error";
        validEmail = false;
    }
    checkForm();
});

password.addEventListener("blur", function () {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (regex.test(password.value)) {
        passError.textContent = "✓ Strong password";
        passError.className = "success";
        validPass = true;
    } else {
        passError.textContent =
            "Password must be 8+ chars, 1 uppercase, 1 number, 1 special char";
        passError.className = "error";
        validPass = false;
    }
    checkForm();
});

confirmPassword.addEventListener("blur", function () {
    if (confirmPassword.value === password.value && confirmPassword.value !== "") {
        confirmError.textContent = "✓ Passwords match";
        confirmError.className = "success";
        validConfirm = true;
    } else {
        confirmError.textContent = "Passwords do not match";
        confirmError.className = "error";
        validConfirm = false;
    }
    checkForm();
});

function checkForm() {
    if (validUser && validEmail && validPass && validConfirm) {
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = "green";
        submitBtn.style.color = "white";
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "";
        submitBtn.style.color = "";
        submitBtn.style.cursor = "not-allowed";
    }
}

form.addEventListener("submit", function (e) {
    if (!(validUser && validEmail && validPass && validConfirm)) {
        e.preventDefault();
    }
});
