const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    likes: {
        type: Number,
        default: 0
    },

    comments: [
        {
            type: String
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);