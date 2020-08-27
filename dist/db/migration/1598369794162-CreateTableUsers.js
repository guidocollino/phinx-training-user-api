"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1598369794162 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsers1598369794162 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                }
            ]
        }), true);
        await queryRunner.createIndex('users', new typeorm_1.TableIndex({
            name: 'IDX_USER_EMAIL',
            columnNames: ['email']
        }));
        const emailUniqueConstraint = new typeorm_1.TableUnique({ columnNames: ['email'] });
        await queryRunner.createUniqueConstraint('users', emailUniqueConstraint);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateTableUsers1598369794162 = CreateTableUsers1598369794162;
//# sourceMappingURL=1598369794162-CreateTableUsers.js.map