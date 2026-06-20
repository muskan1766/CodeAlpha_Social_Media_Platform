window.onload = () => {
    window.scrollTo(0, 0);
};

const postForm =
    document.getElementById("postForm");

const postContent =
    document.getElementById("postContent");

const postsContainer =
    document.getElementById("postsContainer");

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("welcomeUser")
.textContent =
`Welcome, ${currentUser.username} 👋`;

console.log(postForm);
console.log(postContent);
console.log(postsContainer);


document.addEventListener("click", (event) => {

    if (
        event.target.classList.contains("likeBtn")
    ) {

        const post =
            event.target.closest(".post");

        const postId =
            post.dataset.id;

        fetch(
            `http://localhost:5000/like/${postId}`,
            {
                method: "POST"
            }
        )

        .then(response =>
            response.json()
        )

        .then(updatedPost => {

            post.querySelector(
                ".likeCount"
            ).textContent =
                updatedPost.likes;

        });

    }

});

document.addEventListener("click", (event) => {

    if (
        event.target.classList.contains(
            "commentBtn"
        )
    ) {

        const post =
            event.target.closest(".post");

        const postId =
            post.dataset.id;

        const commentInput =
            post.querySelector(
                ".commentInput"
            );

        if (
            commentInput.value.trim() === ""
        ) {

            alert("Comment cannot be empty");

            return;
        }

        fetch(
            `http://localhost:5000/comment/${postId}`,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    comment:
                        commentInput.value

                })

            }
        )

        .then(response =>
            response.json()
        )

        .then(updatedPost => {

            const commentsContainer =
                post.querySelector(
                    ".comments"
                );

            commentsContainer.innerHTML =
                updatedPost.comments
                .map(comment =>
                    `<p>${comment}</p>`
                )
                .join("");

            commentInput.value = "";

        });

    }

});

postForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (postContent.value.trim() === "") {
        alert("Post cannot be empty!");
        return;
    }

    fetch("http://localhost:5000/posts", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            content: postContent.value,

            username: currentUser.username

        })

    })

    .then(response => response.json())

    .then(post => {

        displayPost(post);

        postContent.value = "";

    })

    .catch(error => {

        console.log(error);

    });

});

function displayPost(post) {

    postsContainer.innerHTML += `

    <div class="post" data-id="${post._id}">

        <div class="userInfo">
            👤 ${post.username}
        </div>

        <div class="postTime">
            ${new Date(post.createdAt).toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        )}
        </div>

        <div class="postContent">
            ${post.content}
        </div>

        <button class="likeBtn">

            Like ❤️

            (<span class="likeCount">

                ${post.likes || 0}

            </span>)

        </button>

        <br><br>

        <input

            type="text"

            class="commentInput"

            placeholder="Write a comment"

        >

        <button class="commentBtn">

            Comment

        </button>

        <div class="comments">

            ${(post.comments || [])
                .map(comment =>
                    `<p>${comment}</p>`
                )
                .join("")
            }

        </div>

    </div>

    `;

}

fetch("http://localhost:5000/posts")

.then(response => response.json())

.then(posts => {

    postsContainer.innerHTML = "";

    posts.forEach(post => {

        displayPost(post);

    });

    window.scrollTo(0, 0);

})

.catch(error => {

    console.log(error);

});

window.onload = () => {
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
};