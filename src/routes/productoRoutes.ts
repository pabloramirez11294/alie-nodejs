import { Router } from 'express';
import { productosController} from '../controllers/productosController';
import multer from '../libs/multer';

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
        this.router.post('/cargarImagen',multer.single('nameImage'),productosController.cargarImagen);  
    }
    
    

}

export default new ProductosRoutes().router;