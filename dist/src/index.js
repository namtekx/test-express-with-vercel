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
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const controllers_1 = require("~@/routes/controllers");
const response_module_1 = require("~@/modules/response.module");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
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
app.use(express_1.default.static(path_1.default.join(__dirname, "../../../client")));
app.use((err, req, res) => {
    return res.status(err.status || 500).json({
        isError: true,
        payload: err.toString(),
    });
});
//api
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    return (0, response_module_1.response)(res).success({
        user: {
            email: "nam@gmail.com",
            id: "123",
            query
        }
    });
}));
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    return (0, response_module_1.response)(res).success({
        user: {
            email: "nam@gmail.com",
            id: "123",
            query
        }
    });
}));
app.use("/api/auth", controllers_1.AuthController);
//running
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("running");
    server.listen(process.env.PORT, () => {
        console.log(`> web application is runnning on PORT: ${process.env.PORT}`, {
            port: process.env.PORT,
        });
    });
}))();
//# sourceMappingURL=index.js.map