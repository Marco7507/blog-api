const Person = require("../models/person");
const Company = require("../models/company");
const Profile = require("../models/profile");
const Post = require("../../blog/models/post");
const Comment = require("../../blog/models/comment");
const RESPONSE_MESSAGES = require("../../../__constants__/response_messages");

const { getUrl } = require("../../../utils/getter");
const { removeFields } = require("../../../utils/remover");

const createProfile = async (req, res) => {
    const { kind, ...body } = req.body;

    try {
        let Model;

        switch (kind) {
            case "person":
                Model = Person;
                break;
            case "company":
                Model = Company;
                break;
            default:
                return res.status(400).json({ error: RESPONSE_MESSAGES.INVALID_KIND });
        }

        const profile = new Model({
            ...body,
            ownerId: req.account.id,
            email: req.account.email,
        });

        await profile.save();

        res.header("Location", getUrl(req, profile.id));
        res.status(201).json(removeFields(profile.toObject()));
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ id: req.params.id }).lean().exec();

        if (!profile) {
            return res.status(404).json({ error: RESPONSE_MESSAGES.PROFILE_NOT_FOUND });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({ ownerId: req.account.id }).lean().exec();

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProfile = async (req, res) => {
    delete req.body.ownerId, req.body.email, req.body.id, req.body.kind;

    console.log("req.body", req.body)

    try {
        const { id } = req.params;
        let profile = await Profile.findOne({ id });

        if (!profile) {
            return res.status(404).json({ error: RESPONSE_MESSAGES.PROFILE_NOT_FOUND });
        }

        if (profile.ownerId !== req.account.id) {
            return res.status(403).json({ error: RESPONSE_MESSAGES.YOU_ARE_NOT_OWNER });
        }

        let Model;

        switch (profile.kind) {
            case "person":
                Model = Person;
                break;
            case "company":
                Model = Company;
                break;
            default:
                Model = Profile;
        }

        profile = await Model.findOneAndUpdate({ id }, req.body, {
            new: true,
            runValidators: true,
        }).lean().exec()

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ id: req.params.id }).lean().exec();

        if (!profile) {
            return res.status(404).json({ error: RESPONSE_MESSAGES.PROFILE_NOT_FOUND });
        }

        if (profile.ownerId !== req.account.id) {
            return res.status(403).json({ error: RESPONSE_MESSAGES.YOU_ARE_NOT_OWNER });
        }

        const deleteResponse = await Profile.deleteOne({ id: req.params.id }).lean().exec();

        res.status(200).json(deleteResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProfilesPosts = async (req, res) => {
    try {
        const id = req.params.id;

        const posts = await Post.find({ ownerId: id }).lean.exec();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProfilesComments = async (req, res) => {
    try {
        const id = req.params.id;

        const comments = Comment.find({ ownerId: id });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
