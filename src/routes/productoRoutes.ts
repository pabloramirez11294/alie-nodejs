import { Router } from 'express';
import { productosController} from '../controllers/productosController';


class ProductosRoutes {
    
    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/crear', productosController.create);       
        this.router.put('/eliminar',productosController.eliminar);
        this.router.get('/listar',productosController.listar);
    }
    
    

}

export default new ProductosRoutes().router;