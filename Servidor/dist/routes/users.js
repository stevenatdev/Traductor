"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = __importDefault(require("../controllers/Users"));
const router = (0, express_1.Router)();
router.post('/', Users_1.default.newUser);
exports.default = router;
