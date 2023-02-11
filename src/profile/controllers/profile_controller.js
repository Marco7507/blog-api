const Person = require("../models/person");
const Company = require("../models/company");
const Profile = require("./models/profile");
const Post = require("../post/models/post");
const Comment = require("../comment/models/comment");

const { getUrl } = require("../../../utils/getter");
const { removeFields } = require("../../../utils/remover");

const createProfile = async (req, res) => {
    const { kind, ...body } = req.body;
    let profile;

    try {
        switch (kind) {
            case "person":
                profile = new Person(body);
                break;
            case "company":
                profile = new Company(body);
                break;
            default:
                return res.status(400).json({ msg: "Invalid kind" });
        }

        await profile.save();

        res.header("Location", getUrl(req, profile.id));
        res.status(201).json(removeFields(profile.toObject()));
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ id: req.params.id }).lean().exec();

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({ owner: req.accountId }).lean().exec();

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({ owner: req.accountId, id: req.body.id }, req.body, {
            new: true,
            runValidators: true,
        }).lean().exec();

        if (!profile) {
            return res.status(404).json({ msg: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteProfile = async (req, res) => {
    try {
        const profile = Profile.findOneAndDelete({ owner: req.accountId, id: req.body.id }).lean().exec();

        if (!profile) {
            return res.status(404).json({ msg: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getProfilesPosts = async (req, res) => {
    try {
        const id = req.params.id;

        const posts = await Post.find({ owner: id }).lean.exec();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getProfilesComments = async (req, res) => {
    try {
        const id = req.params.id;

        const comments = Comment.find({ owner: id });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    createProfile,
    getProfiles,
    deleteProfile,
    getProfilesPosts,
    getProfilesComments,
    updateProfile,
    getProfileById,
};
