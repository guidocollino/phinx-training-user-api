"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_repo_1 = require("@db/repository/user.repo");
const router = express_1.Router();
const userRepo = new user_repo_1.UserRepo();
router.get('/', async (req, res) => {
    const users = await userRepo.getUsers();
    res.send(users);
});
router.get('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await userRepo.getUser(userId);
    if (!user) {
        res.status(404).send({ message: 'User not found' });
    }
    res.json(user);
});
router.post('/', async (req, res) => {
    const userParams = req.body;
    const user = await userRepo.createUser(userParams);
    res.send(user);
});
exports.default = router;
//# sourceMappingURL=users.route.js.map