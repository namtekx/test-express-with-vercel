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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const controllers_1 = require("../core/routes/controllers");
const postgres_1 = require("../core/postgres");
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
//setup
app.use(
//@TODO: add to env
(0, cors_1.default)({
    origin: "*",
}));
app.use(body_parser_1.default.json({
    limit: "500mb",
}));
app.use(body_parser_1.default.urlencoded({
    extended: true,
    limit: "500mb",
    parameterLimit: 10000000,
}));
app.use(express_1.default.json({ limit: "500mb" }));
app.use(express_1.default.urlencoded({ limit: "500mb" }));
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.use("/api/auth", controllers_1.AuthController);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield postgres_1.pool.connect()
        .then((data) => {
        return console.log(`Server is listening on ${port}`);
    })
        .catch(err => {
        return console.error(err);
    });
}));
//# sourceMappingURL=index.js.map