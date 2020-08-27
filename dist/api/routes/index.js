"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//index.ts (master file for express.Router)
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const users_route_1 = __importDefault(require("./users.route"));
const router = express_1.Router();
router.use('/users', auth_route_1.default);
router.use('/auth', users_route_1.default);
exports.default = router;
