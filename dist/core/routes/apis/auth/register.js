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
const response_module_1 = require("../../../modules/response.module");
const dml_1 = require("../../../postgres/user/dml");
const User_validator_1 = __importDefault(require("../../../validators/User.validator"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        User_validator_1.default.validateSync(data);
        const user = yield (0, dml_1.fetchUsers)(`SELECT * FROM users WHERE email='${data.email}'`);
        if (!user) {
            return (0, response_module_1.response)(res).error(409, {
                data: "Email is already exists"
            });
        }
        const hashedPassword = bcrypt_1.default.hashSync(data.password, 12);
        const newUser = yield (0, dml_1.createUser)(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        if (newUser) {
            return (0, response_module_1.response)(res).error(409, {
                data: "Cannot Create User"
            });
        }
        return (0, response_module_1.response)(res).success({
            email: newUser.email,
            id: newUser.id,
        });
    }
    catch (err) {
        return (0, response_module_1.response)(res).error(500, {
            data: err
        });
    }
});
//# sourceMappingURL=register.js.map