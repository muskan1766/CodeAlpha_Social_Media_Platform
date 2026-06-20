

const registerForm = document.getElementById("registerForm");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const message = document.getElementById("message");

registerForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (
        usernameInput.value === "" ||
        emailInput.value === "" ||
        passwordInput.value === ""
    ) {
        message.textContent = "Please fill all fields!";
        message.style.color = "red";
        return;
    }

    if (usernameInput.value.length < 3) {
        message.textContent = "Username must be at least 3 characters long!";
        message.style.color = "red";
        return;
    }

    if (!emailInput.value.includes("@")) {
        message.textContent = "Please enter a valid email!";
        message.style.color = "red";
        return;
    }


    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) => response.json())
    .then((data) => {

        message.textContent = data.message;
        message.style.color = "green";

        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

    })
    .catch((error) => {

        message.textContent = "Registration Failed!";
        message.style.color = "red";

        console.log(error);

    });

    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    
});