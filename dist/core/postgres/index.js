"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const postgres_1 = require("@vercel/postgres");
exports.pool = (0, postgres_1.createPool)({
    connectionString: "postgres://default:NGhij6mVlr7Z@ep-nameless-dawn-a4rodosq-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require"
});
//# sourceMappingURL=index.js.map