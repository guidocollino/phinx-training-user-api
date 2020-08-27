"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("@db/entity/user.entity");
class UserRepo {
    createUser(userParams) {
        const user = typeorm_1.getRepository(user_entity_1.User).create(userParams);
        return typeorm_1.getRepository(user_entity_1.User).save(user);
    }
    getUsers() {
        return typeorm_1.getRepository(user_entity_1.User)
            .createQueryBuilder('User')
            .select(['User.id', 'User.name', 'User.email'])
            .getMany();
    }
    getUser(userId) {
        return typeorm_1.getRepository(user_entity_1.User).findOne(userId);
    }
    getUserByEmail(userEmail) {
        return typeorm_1.getRepository(user_entity_1.User).findOne({ email: userEmail });
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=user.repo.js.map