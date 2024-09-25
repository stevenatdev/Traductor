"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Translation_1 = __importDefault(require("../controllers/Translation"));
const router = (0, express_1.Router)();
router.post('/', Translation_1.default.getTranslation);
exports.default = router;
