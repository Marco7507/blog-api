const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/authenticate");
const { deleteAccount, login, register, verify } = require("./controllers/account_controller");

router.post("/login", login);

router.post("/register", register);

router.get("/verify", authenticate, verify);

router.delete("/delete", deleteAccount);

module.exports = router;
