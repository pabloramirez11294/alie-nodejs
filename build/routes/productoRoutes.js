"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productosController_1 = require("../controllers/productosController");
var multer_1 = __importDefault(require("../libs/multer"));
var ProductosRoutes = /** @class */ (function () {
    function ProductosRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ProductosRoutes.prototype.config = function () {
        this.router.post('/crear', productosController_1.productosController.create);
        this.router.put('/eliminar', productosController_1.productosController.eliminar);
        this.router.get('/listar/:id', productosController_1.productosController.listar);
        this.router.get('/buscar/:nombre', productosController_1.productosController.buscar);
        this.router.post('/cargarImagen', multer_1.default.single('nameImage'), productosController_1.productosController.cargarImagen);
        this.router.post('/cargaMasiva', productosController_1.productosController.cargaMasiva);
    };
    return ProductosRoutes;
}());
exports.default = new ProductosRoutes().router;
