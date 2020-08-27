"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("@utils/jwt");
const encode_1 = require("@utils/encode");
const user_repo_1 = require("@db/repository/user.repo");
const express_validator_1 = require("express-validator");
const _registerValidations = () => {
    console.log('VALIDATIONS REGISTER....');
    return [express_validator_1.body('email').isEmail(), express_validator_1.body('password').isLength({ min: 5 })];
};
const userRepo = new user_repo_1.UserRepo();
const router = express_1.Router();
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await userRepo.getUserByEmail(email);
        const checkCredentials = user ? encode_1.comparePasswordEncrypted(password, user.password) : false;
        if (!checkCredentials) {
            res.status(403).send({ message: 'wrong username or password' });
        }
        const jwtPayload = jwt_1.createJwtPayload(email);
        console.log('PAYLOAD', jwtPayload);
        const jwtToken = jwt_1.createJwtToken(jwtPayload);
        console.log('TOKEN-------', jwtToken);
        res.json({ token: jwtToken });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
router.post('/register', [express_validator_1.body('email').isEmail(), express_validator_1.body('password').isLength({ min: 5 })], async (req, res) => {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const passwordEncrypted = encode_1.generatePasswordEncrypted(req.body.password);
        req.body.password = passwordEncrypted;
        const newUser = await userRepo.createUser(req.body);
        return res.send(newUser);
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.default = router;
//# sourceMappingURL=auth.route.js.map