"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        //res.send('Hello');
        res.json({ text: 'Api es una prueba' });
    };
    return IndexController;
}());
exports.indexController = new IndexController();
