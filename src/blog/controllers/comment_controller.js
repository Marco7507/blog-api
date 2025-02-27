const Comment = require("../models/comment");
const Post = require("../models/post");
const Profile = require("../../profile/models/profile");

const { getUrl } = require("../../../utils/getter");
const { removeFields } = require("../../../utils/remover");

const createComment = async (req, res) => {
    const { id, profileId } = req.params;

    try {
        const profile = await Profile.findOne({
            id: profileId,
            ownerId: req.account.id,
        }).exec();

        if (!profile) {
            return res.status(404).json({ msg: RESPONSE_MESSAGES.PROFILE_NOT_FOUND });
        }

        const comment = new Comment({
            ...req.body,
            postId: id,
            ownerId: profile.id,
        });

        req.post.commentsCount++;

        await Promise.all([req.post.save(), comment.save()]);

        res.header("Location", getUrl(req, comment.id));
        res.status(201).json({ comment: removeFields(comment.toObject()) });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            id: req.params.id,
        }).lean();
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        const post = await Post.findOne({ id: comment.post }).exec();
        post.commentsCount--;

        await post.save();

        res.status(204).end();
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getAllComments = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const comments = await Comment.find({ postId: id })
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
        .exec();

    const count = await Comment.find({ postId: id }).count();

    res.status(200).json({
        comments: removeFields(comments),
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
    });
};

module.exports = {
    createComment,
    deleteComment,
    getAllComments,
};
