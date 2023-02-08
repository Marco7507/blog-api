const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const postSchema = new mongoose.Schema({
    commentsCount: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    id: {
        type: String,
        default: uuidv4,
    },
    title: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);
