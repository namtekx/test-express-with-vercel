"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../apis/auth");
const router = express_1.default.Router();
router.get("/access_token", auth_1.AccessToken);
router.post("/login", auth_1.Login);
exports.default = router;
//# sourceMappingURL=AuthController.js.map