module.exports = ResponseMessages = {
    INVALID_POST_BODY: "Post body is invalid",
    INVALID_POST_BODY_LENGTH: (minLength, maxLength) => `Post body length must be between ${minLength} and ${maxLength} characters`,
    POST_NOT_FOUND: "Post not found",
    POST_UPDATED: "Post updated",
    INVALID_PAGE_OR_LIMIT: "Page and limit must be greater than 0",
    YOU_ARE_NOT_OWNER: "You are not owner of this post",
    INVALID_KIND: "Invalid kind",
    PROFILE_NOT_FOUND: "Profile not found",
};
