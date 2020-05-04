import { Router } from 'express';
import { registerController} from '../controllers/registerController';
class RegisterRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', registerController.getUsuarios);       
        this.router.post('/crear', registerController.create);
        this.router.post('/login', registerController.loginUser);
        this.router.get('/confirmar/:id', registerController.confirmarCorreo);
        this.router.put('/adminActualizar', registerController.adminActualizar);
        //this.router.get('/enviar', registerController.enviarCorreo);
    }

}

export default new RegisterRoutes().router;