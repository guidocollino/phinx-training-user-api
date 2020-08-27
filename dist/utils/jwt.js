"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJwtToken = exports.createJwtToken = exports.createJwtPayload = void 0;
const config_1 = require("@utils/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createJwtPayload = (email) => {
    return { email };
};
exports.createJwtToken = (payload) => {
    const jwtKey = config_1.useConfigDefault('jwt.key');
    const jwtExpireIn = parseInt(config_1.useConfigDefault('jwt.expireIn'));
    console.log('KEY-EXPIREIN', jwtKey, jwtExpireIn);
    return jsonwebtoken_1.default.sign(payload, jwtKey, { expiresIn: jwtExpireIn });
};
exports.validateJwtToken = (token) => {
    try {
        const jwtKey = config_1.useConfigDefault('jwt.key');
        jsonwebtoken_1.default.verify(token, jwtKey);
        return true;
    }
    catch (err) {
        return false;
    }
};
//# sourceMappingURL=jwt.js.map