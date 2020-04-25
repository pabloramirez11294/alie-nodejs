"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productosController_1 = require("../controllers/productosController");
var ProductosRoutes = /** @class */ (function () {
    function ProductosRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ProductosRoutes.prototype.config = function () {
        this.router.post('/crear', productosController_1.productosController.create);
        this.router.put('/eliminar', productosController_1.productosController.eliminar);
        this.router.get('/listar', productosController_1.productosController.listar);
    };
    return ProductosRoutes;
}());
exports.default = new ProductosRoutes().router;
