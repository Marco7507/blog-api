const express = require("express");
const router = express.Router();

const {
    createPost,
    deletePost,
    getAll,
    getById,
    updatePost,
} = require("./controllers/post_controller");

const {
    createComment,
    deleteComment,
    getAllComments,
} = require("./controllers/comment_controller");

const { postExistsMiddleware, contentBodyMiddleware } = require("./middlewares");

router.use((req, res, next) => {
    delete req.body.id;
    delete req.body.__v;

    next();
});

// @route   GET /blog/posts
router.get("/posts", getAll);

// @route   GET /blog/posts/:id
router.get("/posts/:id", postExistsMiddleware, getById);

// @route   POST /blog/posts
router.post("/posts/:profileId", contentBodyMiddleware, createPost);

// @route   PUT /blog/posts/:id
router.patch("/posts/:id", postExistsMiddleware, contentBodyMiddleware, updatePost);

// @route   DELETE api/blog/posts/:id
router.delete("/posts/:id", postExistsMiddleware, deletePost);

// @route   GET /blog/posts/:id/comments
router.get("/posts/:id/comments", postExistsMiddleware, getAllComments);

// @route   POST /blog/posts/:id/comments
router.post("/posts/:id/comments/:profileId", postExistsMiddleware, createComment);

// @route   DELETE /blog/comments/:commentId
router.delete("/comments/:id", deleteComment);

module.exports = router;
