"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
app_1.default.get('/healthcheck', function (req, res) {
    res.send('OK');
});
app_1.default.listen(PORT, '0.0.0.0', () => {
    console.log('Server listening on PORT:', PORT);
});
//# sourceMappingURL=index.js.map