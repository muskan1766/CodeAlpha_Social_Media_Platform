const loginForm = document.getElementById("loginForm");

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const enteredUsername =
        loginUsername.value;

    const enteredPassword =
        loginPassword.value;


    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: enteredUsername,
            password: enteredPassword
        })
    })
    .then(response => response.json())
    .then(data => {

        if (data.user) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            loginMessage.textContent =
                "Login Successful!";

            loginMessage.style.color =
                "green";

            window.location.href =
                "profile.html";

        } else {

            loginMessage.textContent =
                data.message;

            loginMessage.style.color =
                "red";

        }

    })
    .catch(error => {

        console.log(error);

        loginMessage.textContent =
            "Invalid Username or Password";

        loginMessage.style.color =
            "red";

    });
    });