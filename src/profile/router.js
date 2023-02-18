const router = require("express").Router();

const {
    createProfile,
    getProfiles,
    deleteProfile,
    getProfilesPosts,
    getProfilesComments,
    updateProfile,
    getProfileById,
} = require("./controllers/profile_controller");

// @route   GET /
router.get("", getProfiles);

// @route   POST /
router.post("", createProfile);

// @route   PATCH /
router.patch("/:id", updateProfile);

// @route   DELETE /
router.delete("/:id", deleteProfile);

// @route   GET /:id
router.get("/:id", getProfileById);

// @route   GET /:id/posts
router.get("/:id/posts/", getProfilesPosts);

// @route   GET /:id/comments
router.get("/:id/comments/", getProfilesComments);

module.exports = router;
