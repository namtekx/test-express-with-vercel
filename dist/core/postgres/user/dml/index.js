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
exports.deleteUsers = exports.updateUsers = exports.fetchUsers = exports.createUser = void 0;
const index_1 = require("../../index");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_1.pool.sql `
        INSERT INTO users (name, username, password, phone, email, photo)
        VALUES ('${data.name}', '${data.userName}', '${data.password}', '${data.phone}', '${data.email}', '${data.phone}');
    `;
        if (user.rows.length > 0) {
            return user.rows[0];
        }
        return null;
    }
    catch (err) {
        throw err;
    }
});
exports.createUser = createUser;
const fetchUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (query) {
            const user = yield index_1.pool.sql `${query}`;
            return user.rows;
        }
        const user = yield index_1.pool.sql `SELECT * FROM users`;
        return user.rows;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.fetchUsers = fetchUsers;
const updateUsers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.pool.sql `
    UPDATE users 
      SET name = ${data.name}, 
          username = ${data.userName},
          phone = ${data.phone},
          email = ${data.email},
          photo = ${data.photo},
      WHERE id = ${data.id}`;
    return user.rows;
});
exports.updateUsers = updateUsers;
const deleteUsers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.pool.sql `DELETE FROM users WHERE id = ${data.id}`;
    return user.rows;
});
exports.deleteUsers = deleteUsers;
//# sourceMappingURL=index.js.map