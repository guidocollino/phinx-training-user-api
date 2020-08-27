"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfigDefault = exports.useConfig = void 0;
const config_1 = __importDefault(require("config"));
exports.useConfig = (key) => config_1.default.get(key);
exports.useConfigDefault = (key) => {
    if (config_1.default.has(key))
        return config_1.default.get(key);
    return 'INSERT_ENV_VARIABLE';
};
//# sourceMappingURL=config.js.map