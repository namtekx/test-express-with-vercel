"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTable = void 0;
const index_1 = require("../../index");
const createUserTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield index_1.pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255),
            password TEXT NOT NULL,
            phone VARCHAR(255),
            email TEXT NOT NULL UNIQUE,
            photo VARCHAR(255),
            active BOOLEAN DEFAULT TRUE
        );
    `);
    return table;
});
exports.createUserTable = createUserTable;
//# sourceMappingURL=index.js.map