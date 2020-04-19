"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var loginController_1 = require("../controllers/loginController");
var LoginRoutes = /** @class */ (function () {
    function LoginRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    LoginRoutes.prototype.config = function () {
        this.router.get('/', loginController_1.loginController.run);
        // this.router.get('/:id', gamesController.getOne);
        this.router.post('/', loginController_1.loginController.create);
        //this.router.put('/:id', gamesController.update);
        // this.router.delete('/:id', gamesController.delete);
    };
    return LoginRoutes;
}());
exports.default = new LoginRoutes().router;
