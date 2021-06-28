"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router"));
var index_1 = require("./models/index");
var app = express_1["default"]();
var PORT = process.env.PORT || 3001;
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(router_1["default"]);
index_1.sequelize.sync().then(function () {
    app.listen(PORT, function (error) {
        error && console.log(error);
        console.log("server is running on " + PORT + "\uD83C\uDF89");
    });
});
