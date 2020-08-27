"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.connect = async () => {
    const connection = await typeorm_1.createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'user_api_develop',
        synchronize: false,
        entities: ['dist/db/entity/*.{ts,js}'],
        migrations: ['dist/db/migration/*.{ts,js}'],
        cli: {
            entitiesDir: '@db/entity',
            migrationsDir: '@db/migration'
        }
    });
    return connection;
};
//# sourceMappingURL=connection.js.map