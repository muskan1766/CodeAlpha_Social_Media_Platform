const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");


dotenv.config();

console.log(process.env.MONGO_URI); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

const User = require("./models/User");
const Post = require("./models/Post");

app.post("/register", async (req, res) => {

    try {

        const hashedPassword =
        await bcrypt.hash(
            req.body.password,
            10
        );

        const user = new User({

            username: req.body.username,

            email: req.body.email,

            password: hashedPassword

        });

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
app.get("/", (req, res) => {
  res.send("Social Media Platform API is Running");
});

app.post("/follow", async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.body.userId,
            { $inc: { followers: 1 } },
            { new: true }
        );

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.post("/posts", async (req, res) => {

    if (!req.body.content || req.body.content.trim() === "") {
        return res.status(400).json({
            message: "Post content cannot be empty"
        });
    }

    try {

        const post = new Post({

            content: req.body.content,

            username: req.body.username

        });

        await post.save();

        res.status(201).json(post);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.get("/posts", async (req, res) => {

    try {

        const posts = await Post.find();

        res.json(posts);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.post("/like/:id", async (req, res) => {

    try {

        const post = await Post.findByIdAndUpdate(

            req.params.id,

            {
                $inc: {
                    likes: 1
                }
            },

            {
                new: true
            }

        );

        res.json(post);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.post("/comment/:id", async (req, res) => {

    try {

        const post = await Post.findByIdAndUpdate(

            req.params.id,

            {
                $push: {
                    comments: req.body.comment
                }
            },

            {
                new: true
            }

        );

        res.json(post);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/login", async (req, res) => {

    try {

        const user =
        await User.findOne({

            username: req.body.username

        });

        if (!user) {

            return res.status(401).json({

                message:
                "Invalid Username or Password"

            });

        }
        const validPassword =
        await bcrypt.compare(

            req.body.password,

            user.password

        );

        if (validPassword) {

            res.json({
                message: "Login Successful",
                user: user
            });

        } else {

            res.status(401).json({
                message: "Invalid Username or Password"
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});