"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControler_1 = require("../controllers/userControler");
const router = (0, express_1.Router)();
router.post('/signup', userControler_1.verifyUsernameAndPassword, userControler_1.createUser, userControler_1.createAccount);
router.post('/signin', userControler_1.login);
router.get('/signout', userControler_1.logout);
exports.default = router;
