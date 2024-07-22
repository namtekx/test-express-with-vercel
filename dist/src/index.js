"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const controllers_1 = require("../core/routes/controllers");
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
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map