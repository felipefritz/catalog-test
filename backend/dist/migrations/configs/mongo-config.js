"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mongodb: {
        url: process.env.MONGODB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'migrations',
};
//# sourceMappingURL=mongo-config.js.map