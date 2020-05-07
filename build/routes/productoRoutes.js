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
        this.router.get('/getProducto/:codigo', productosController_1.productosController.getProducto);
        this.router.get('/buscar/:nombre', productosController_1.productosController.buscar);
        this.router.post('/cargarImagen', multer_1.default.single('nameImage'), productosController_1.productosController.cargarImagen);
        this.router.post('/cargaMasiva', productosController_1.productosController.cargaMasiva);
        this.router.post('/agregarCarrito', productosController_1.productosController.agregarCarrito);
        this.router.get('/getCarrito/:id', productosController_1.productosController.getCarrito);
        this.router.put('/comprar', productosController_1.productosController.comprar);
        this.router.get('/reporte3/:year', productosController_1.productosController.reporte3);
        this.router.get('/reporte4', productosController_1.productosController.reporte4);
        this.router.get('/reporte6', productosController_1.productosController.reporte6);
        this.router.get('/reporte7', productosController_1.productosController.reporte7);
        this.router.get('/reporte8', productosController_1.productosController.reporte8);
        this.router.get('/reporte10/:cantidad', productosController_1.productosController.reporte10);
    };
    return ProductosRoutes;
}());
exports.default = new ProductosRoutes().router;
