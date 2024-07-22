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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const Login_validator_1 = __importDefault(require("../../../validators/Login.validator"));
const response_module_1 = require("../../../modules/response.module");
const generate_module_1 = require("../../../modules/generate.module");
const dml_1 = require("../../../postgres/user/dml");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        Login_validator_1.default.validateSync(data);
        const users = yield (0, dml_1.fetchUsers)(`SELECT * FROM users WHERE email='${data.email}' AND password='${data.password}'`);
        if (users.length <= 0) {
            return (0, response_module_1.response)(res).error(404, {
                data: "User Not Found"
            });
        }
        const user = users[0];
        const isMatched = bcrypt_1.default.compareSync(data.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isMatched) {
            return (0, response_module_1.response)(res).error(401, {
                data: "User Not Found"
            });
        }
        const token = (0, generate_module_1.generateToken)({
            "x-user-id": user.id,
            email: user.email,
        });
        return (0, response_module_1.response)(res).success({
            data: token,
            user: {
                email: user.email,
                id: user.id,
            }
        });
    }
    catch (err) {
        return (0, response_module_1.response)(res).error(500, {
            data: err
        });
    }
});
//# sourceMappingURL=login.js.map