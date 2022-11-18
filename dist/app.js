"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const balanceRoutes_1 = __importDefault(require("./routes/balanceRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/balance', balanceRoutes_1.default);
app.use('/api/v1/transactions', transactionRoutes_1.default);
app.use(errorController_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Este servidor não tem um endpoint ${req.originalUrl}`, 405));
});
exports.default = app;
