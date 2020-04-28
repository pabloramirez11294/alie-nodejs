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
        this.router.get('/listar/:id',productosController.listar);
        this.router.get('/buscar/:nombre',productosController.buscar);
    }
    
    

}

export default new ProductosRoutes().router;