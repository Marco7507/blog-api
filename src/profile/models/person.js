const mongoose = require("mongoose");
const Profile = require("./profile");

const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

module.exports = Profile.discriminator("person", personSchema);
