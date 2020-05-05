"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var registerController_1 = require("../controllers/registerController");
var RegisterRoutes = /** @class */ (function () {
    function RegisterRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    RegisterRoutes.prototype.config = function () {
        this.router.get('/listar', registerController_1.registerController.getUsuarios);
        this.router.post('/crear', registerController_1.registerController.create);
        this.router.post('/login', registerController_1.registerController.loginUser);
        this.router.get('/confirmar/:id', registerController_1.registerController.confirmarCorreo);
        this.router.put('/adminActualizar', registerController_1.registerController.adminActualizar);
        this.router.post('/adminRegistro', registerController_1.registerController.adminRegistro);
        this.router.get('/getBitacora/:id', registerController_1.registerController.getBitacora);
        this.router.get('/getUsuario/:id', registerController_1.registerController.getUsuario);
        this.router.put('/actualizarUsuario', registerController_1.registerController.actualizarUsuario);
        //this.router.get('/enviar', registerController.enviarCorreo);
    };
    return RegisterRoutes;
}());
exports.default = new RegisterRoutes().router;
