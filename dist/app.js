"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const auth_route_1 = __importDefault(require("@routes/auth.route"));
const users_route_1 = __importDefault(require("@routes/users.route"));
const connection_1 = require("@db/connection");
connection_1.connect();
const jwt_1 = require("@utils/jwt");
const authJwtTokem = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt_1.validateJwtToken(token) ? next() : res.sendStatus(403);
};
const apiPath = '/api/v1';
const app = express_1.default();
// parse application/json
app.use(bodyParser.json());
app.use(`${apiPath}/auth`, auth_route_1.default);
app.use(`${apiPath}/users`, [authJwtTokem, users_route_1.default]);
exports.default = app;
//# sourceMappingURL=app.js.map