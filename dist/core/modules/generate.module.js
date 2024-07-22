"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCodeReset = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const { key } = JSON.parse(`{ "type": "HS256", "key": "${process.env.SIGN || "davinci-2024"}"}`);
    return jsonwebtoken_1.default.sign(payload, key, {
        algorithm: "HS256",
        subject: "user_authentication",
        expiresIn: "30d",
    });
};
exports.generateToken = generateToken;
const generateCodeReset = (payload) => {
    const { key } = JSON.parse(`{ "type": "HS256", "key": "${process.env.SIGN || "davinci-2024"}"}`);
    return jsonwebtoken_1.default.sign(payload, key, {
        algorithm: "HS256",
        subject: "user_reset_pass",
        expiresIn: "1d",
    });
};
exports.generateCodeReset = generateCodeReset;
//# sourceMappingURL=generate.module.js.map