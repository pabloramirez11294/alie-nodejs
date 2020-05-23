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
        this.router.get('/getProducto/:codigo',productosController.getProducto);
        this.router.get('/buscar/:nombre',productosController.buscar);
        this.router.get('/buscarTodos',productosController.buscarTodos);
        this.router.post('/cargarImagen',multer.single('nameImage'),productosController.cargarImagen);  
        this.router.post('/cargaMasiva', productosController.cargaMasiva);   
        this.router.post('/agregarCarrito', productosController.agregarCarrito);  
        this.router.get('/getCarrito/:id', productosController.getCarrito);  
        this.router.put('/comprar',productosController.comprar);

        this.router.get('/reporte3/:year', productosController.reporte3); 
        this.router.get('/reporte4', productosController.reporte4); 
        this.router.get('/reporte6', productosController.reporte6); 
        this.router.get('/reporte7', productosController.reporte7); 
        this.router.get('/reporte8', productosController.reporte8); 
        this.router.get('/reporte10/:cantidad', productosController.reporte10); 
    }
    
    

}

export default new ProductosRoutes().router;