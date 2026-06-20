
let currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);
if (!currentUser) {
    window.location.href = "login.html";
}


const profileUsername =
    document.getElementById("profileUsername");

const profileEmail =
    document.getElementById("profileEmail");

profileUsername.textContent =
    currentUser.username;

profileEmail.textContent =
    currentUser.email;

const feedBtn =
    document.getElementById("feedBtn");

feedBtn.addEventListener("click", () => {

    window.location.href = "index.html";

});

const followersCount =
    document.getElementById("followersCount");

const followBtn =
    document.getElementById("followBtn");

followersCount.textContent =
    currentUser.followers;

followBtn.addEventListener("click", () => {

    fetch("http://localhost:5000/follow", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            userId: currentUser._id
        })

    })

    .then(response => response.json())

    .then(updatedUser => {

        currentUser = updatedUser;

        localStorage.setItem(
            "currentUser",
            JSON.stringify(updatedUser)
        );

        followersCount.textContent =
            updatedUser.followers;

        followBtn.textContent =
            "Following";

        followBtn.disabled = true;

    });

});

followersCount.textContent =
    currentUser.followers || 0;

followBtn.addEventListener("click", () => {

    followers++;

    followersCount.textContent =
        followers;

    localStorage.setItem(
        "followers",
        followers
    );

    localStorage.setItem(
        "isFollowing",
        "true"
    );

    followBtn.textContent =
        "Following";

    followBtn.disabled =
        true;

});

const logoutBtn =
    document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

});