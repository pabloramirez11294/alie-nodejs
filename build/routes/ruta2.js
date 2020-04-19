"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Ruta2 = /** @class */ (function () {
    function Ruta2() {
        this.router = express_1.Router();
        this.config();
    }
    Ruta2.prototype.config = function () {
        this.router.get('/', function (req, res) { return res.send('ruta2'); });
    };
    return Ruta2;
}());
var ruta2 = new Ruta2();
exports.default = ruta2.router;
