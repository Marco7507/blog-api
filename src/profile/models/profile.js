const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const baseSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        email: {
            type: String,
        },
        id: {
            type: String,
            default: uuidv4,
        },
        ownerId: {
            type: String,
            ref: "Account",
        },
        updatedAt: {
          type: Date,
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        discriminatorKey: "kind",
    },
);

module.exports = mongoose.model("Profile", baseSchema);
