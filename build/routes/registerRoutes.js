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
        this.router.get('/listar', registerController_1.registerController.run);
        this.router.post('/crear', registerController_1.registerController.create);
        this.router.post('/login', registerController_1.registerController.loginUser);
        this.router.get('/confirmar/:id', registerController_1.registerController.confirmarCorreo);
    };
    return RegisterRoutes;
}());
exports.default = new RegisterRoutes().router;
