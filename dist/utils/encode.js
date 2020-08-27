"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswordEncrypted = exports.generatePasswordEncrypted = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("@utils/config");
exports.generatePasswordEncrypted = (password) => {
    let salt = Number(config_1.useConfig('bcrypt.salt'));
    salt = Number(bcrypt_1.default.genSaltSync(salt));
    return bcrypt_1.default.hashSync(password, salt);
};
exports.comparePasswordEncrypted = (password, hash) => bcrypt_1.default.compareSync(password, hash);
//# sourceMappingURL=encode.js.map